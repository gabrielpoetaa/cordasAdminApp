package repositories

import (
	"api/src/models"
	"database/sql"
	"encoding/json"
	"log"
)


type Students struct {
	db *sql.DB
}


// Cria um repositorio de estudantes
func NewStudentRepository(db *sql.DB) *Students {
	if db == nil {
        log.Fatal("Database connection is nil")
    }
	return &Students{db}
}

// Insere um estudante no banco de dados
func (repository Students) Create(student models.Student) (uint64, error) {
	
	musicPreferencesJSON, err := json.Marshal(student.Music_preferences)
	if err != nil {
		log.Printf("Error marshaling Music_preferences: %v", err)
		return 0, err
	}

	howDidYouFindUsJSON, err := json.Marshal(student.How_did_you_find_us)
	if err != nil {
		log.Printf("Error marshaling How_did_you_find_us: %v", err)
		return 0, err
	}

	courseIDMap := make(map[string]int)
	teacherIDMap := make(map[string]int)


	// Verificar os cursos e professores antes de inserir o estudante
	for _, course := range student.Courses {
		// Seleciona o ID do curso de acordo com o nome que veio na requisição
		var courseID int
		err := repository.db.QueryRow("SELECT id FROM courses WHERE course_name = ?", course.CourseName).Scan(&courseID)
		if err != nil {
			log.Printf("Error finding course by name: %v", err)
			return 0, err
		}
		courseIDMap[course.CourseName] = courseID

		// Seleciona o ID do professor de acordo com o nome que veio na requisição
		var teacherID int
		err = repository.db.QueryRow("SELECT id FROM teachers WHERE teacher_name = ?", course.TeacherName).Scan(&teacherID)
		if err != nil {
			log.Printf("Error finding teacher by name: %v", err)
			return 0, err
		}
		teacherIDMap[course.TeacherName] = teacherID
	}

	// Preparação do comando para inserir estudante
	statementStudent, err := repository.db.Prepare(
		"insert into students (Student_name, Date_of_birth, CPF, Email, Previous_knowledge, Participate_projects, Music_preferences, How_did_you_find_us) values (?, ?, ?, ?, ?, ?, ?, ?)",
	)
	if err != nil {
		log.Printf("Error preparing statement: %v", err)
		return 0, err
	}

	defer statementStudent.Close()
	
	// Inserção do estudante
	resultStudent, err := statementStudent.Exec(
		student.Student_name,
		student.Date_of_birth,
		student.CPF,
		student.Email,
		student.Previous_knowledge,
		student.Participate_projects,
		musicPreferencesJSON,
		howDidYouFindUsJSON,
	)

    if err != nil {
        log.Printf("Error executing statement: %v", err)
        return 0, err
    }

    studentID, err := resultStudent.LastInsertId()
    if err != nil {
        log.Printf("Error retrieving LastInsertId: %v", err)
        return 0, err
    }

	// Relacionar o estudante ao curso
	for _, course := range student.Courses {
		courseID := courseIDMap[course.CourseName]
		teacherID := teacherIDMap[course.TeacherName]
	
		statementCourseRelation, err := repository.db.Prepare(
			"INSERT INTO student_course (student_id, course_id) VALUES (?, ?)",
		)
		if err != nil {
			log.Printf("Error preparing statement for student-course relationship: %v", err)
			return 0, err
		}
		defer statementCourseRelation.Close()

		_, err = statementCourseRelation.Exec(studentID, courseID)
		if err != nil {
			log.Printf("Error executing statement for student-course relationship: %v", err)
			return 0, err
		}

		// Relacionar o estudante ao professor
		statementTeacherRelation, err := repository.db.Prepare(
			"INSERT INTO student_teacher (student_id, teacher_id) VALUE (?, ?)", 
		)
		if err != nil {
			log.Printf("Error preparing statement for student-teacher relationship: %v", err)
			return 0, err
		}
		defer statementTeacherRelation.Close()

		_, err = statementTeacherRelation.Exec(studentID, teacherID)
		if err != nil {
			log.Printf("Error executing statament for student-teacher relationship: %v", err)
			return 0, err
		}

		// Inserir o relacionamento entre professor e curso, se não existir
		_, err = repository.db.Exec(`
			INSERT INTO teacher_course (teacher_id, course_id)
			VALUES (?, ?)
		`, teacherID, courseID)
		if err != nil {
			log.Printf("Error inserting teacher-course relationship: %v", err)
			return 0, err
		}
	}

	
	return uint64(studentID), nil
}