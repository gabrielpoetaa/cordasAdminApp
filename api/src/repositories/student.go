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
	processedTeachers := make(map[string]bool) // Para controlar professores já processados


	// Verificar os cursos e professores antes de inserir o estudante
	for _, course := range student.Courses {
		// Seleciona o ID do curso de acordo com o nome que veio na requisição
		var courseID int
		err := repository.db.QueryRow("SELECT id FROM courses WHERE course_name = $1", course.CourseName).Scan(&courseID)
		if err != nil {
			log.Printf("Error finding course by name: %v", err)
			return 0, err
		}
		courseIDMap[course.CourseName] = courseID

		// Seleciona o ID do professor de acordo com o nome que veio na requisição
		var teacherID int
		err = repository.db.QueryRow("SELECT id FROM teachers WHERE teacher_name = $1", course.TeacherName).Scan(&teacherID)
		if err != nil {
			log.Printf("Error finding teacher by name: %v", err)
			return 0, err
		}
		teacherIDMap[course.TeacherName] = teacherID
	}

	// Preparação do comando para inserir estudante
	statementStudent, err := repository.db.Prepare(
		"INSERT INTO students (Student_name, Date_of_birth, CPF, Email, Previous_knowledge, Participate_projects, Music_preferences, How_did_you_find_us) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
	)
	if err != nil {
		log.Printf("Error preparing statement: %v", err)
		return 0, err
	}
	defer statementStudent.Close()

	// Inserção do estudante
	var studentID int64
	err = statementStudent.QueryRow(
		student.Student_name,
		student.Date_of_birth,
		student.CPF,
		student.Email,
		student.Previous_knowledge,
		student.Participate_projects,
		musicPreferencesJSON,
		howDidYouFindUsJSON,
	).Scan(&studentID)

    if err != nil {
        log.Printf("Error executing statement: %v", err)
        return 0, err
    }

	// Log dos dados do estudante no repositório
	log.Printf("Dados do estudante no repositório: %+v", student)
	log.Printf("Números de telefone no repositório: %+v", student.Phones)

	// Inserir os números de telefone
	if len(student.Phones) > 0 {
		log.Printf("Inserindo %d números de telefone", len(student.Phones))
		statementPhone, err := repository.db.Prepare(
			"INSERT INTO phones (student_id, phone_number) VALUES ($1, $2) RETURNING id",
		)
		if err != nil {
			log.Printf("Error preparing statement for phones: %v", err)
			return 0, err
		}
		defer statementPhone.Close()

		for i := range student.Phones {
			if student.Phones[i].PhoneNumber != "" { // Só insere se o número não for vazio
				log.Printf("Inserindo telefone: %+v", student.Phones[i])
				var phoneID int64
				err = statementPhone.QueryRow(studentID, student.Phones[i].PhoneNumber).Scan(&phoneID)
				if err != nil {
					log.Printf("Error inserting phone number: %v", err)
					return 0, err
				}
				student.Phones[i].ID = uint64(phoneID)
				student.Phones[i].StudentID = uint64(studentID)
				log.Printf("Telefone inserido com sucesso. ID: %d", phoneID)
			}
		}
	} else {
		log.Printf("Nenhum número de telefone para inserir")
	}
	
	
	// Relacionar o estudante aos cursos e professores
	for _, course := range student.Courses {
		courseID := courseIDMap[course.CourseName]
		teacherID := teacherIDMap[course.TeacherName]
	
		// Inserir relação estudante-curso
		statementCourseRelation, err := repository.db.Prepare(
			"INSERT INTO student_course (student_id, course_id) VALUES ($1, $2)",
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

		// Inserir relação estudante-professor apenas se ainda não foi processado
		if !processedTeachers[course.TeacherName] {
			statementTeacherRelation, err := repository.db.Prepare(
				"INSERT INTO student_teacher (student_id, teacher_id) VALUES ($1, $2)", 
			)
			if err != nil {
				log.Printf("Error preparing statement for student-teacher relationship: %v", err)
				return 0, err
			}
			defer statementTeacherRelation.Close()

			_, err = statementTeacherRelation.Exec(studentID, teacherID)
			if err != nil {
				log.Printf("Error executing statement for student-teacher relationship: %v", err)
				return 0, err
			}
			processedTeachers[course.TeacherName] = true
		}

		// Inserir o relacionamento entre professor e curso
		_, err = repository.db.Exec(`
			INSERT INTO teacher_course (teacher_id, course_id)
			VALUES ($1, $2)
			ON CONFLICT (teacher_id, course_id) DO NOTHING
		`, teacherID, courseID)
		if err != nil {
			log.Printf("Error inserting teacher-course relationship: %v", err)
			return 0, err
		}
	}

	
	return uint64(studentID), nil
}