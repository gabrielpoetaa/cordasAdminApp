package models

import (
	"errors"
	"reflect"
	"strings"
)

type Address struct {
	ID                     uint64 `json:"id,omitempty"`
	Street                 string `json:"street,omitempty"`
	StreetNumber           string `json:"streetNumber,omitempty"`
	StreetNumberComplement string `json:"streetNumberComplement,omitempty"`
	Neighborhood           string `json:"neighborhood,omitempty"`
	City                   string `json:"city,omitempty"`
	State                  string `json:"state,omitempty"`
	Country                string `json:"country,omitempty"`
}

type Phone struct {
	ID          uint64 `json:"id,omitempty"`
	StudentID   uint64 `json:"student_id,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
}

type Student struct {
	ID                  uint64      `json:"id"`
	Student_name        string      `json:"Student_name"`
	Date_of_birth       string      `json:"Date_of_birth"`
	CPF                 string      `json:"CPF"`
	Email               string      `json:"Email"`
	Previous_knowledge  bool        `json:"Previous_knowledge"`
	Participate_projects bool        `json:"Participate_projects"`
	Music_preferences   []string    `json:"Music_Preferences"`
	How_did_you_find_us []string    `json:"How_did_you_find_us"`
	MobileNumberStrings []string    `json:"mobileNumber"` // Campo temporário para receber os números como strings
	Phones              []Phone     `json:"phones"`        // Campo que será usado para salvar no banco
	Courses             []Course    `json:"courses"`
}

type Course struct {
	CourseName  string `json:"course_name,omitempty"`
	TeacherName string `json:"teacher_name,omitempty"`
}

func (student *Student) Prepare() error {
	// Primeiro converte os números de telefone
	student.Phones = make([]Phone, len(student.MobileNumberStrings))
	for i, phoneNumber := range student.MobileNumberStrings {
		student.Phones[i] = Phone{
			PhoneNumber: phoneNumber,
		}
	}

	// Depois valida e formata
	if err := student.validate(); err != nil {
		return err
	}

	student.format()

	return nil
}

func (student *Student) validate() error {
	v := reflect.ValueOf(*student)
	typeOfT := v.Type()

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		fieldType := field.Type()
		fieldName := typeOfT.Field(i).Name

		// Ignora campos que são preenchidos internamente
		if fieldName == "ID" || fieldName == "Phones" {
			continue
		}

		if fieldType.Kind() == reflect.String {
			if field.String() == "" {
				return errors.New("Campo " + fieldName + " é obrigatório")
			}
		} else if fieldType.Kind() == reflect.Slice {
			if field.Len() == 0 {
				return errors.New("Campo " + fieldName + " é obrigatório")
			}
		}
	}

	return nil
}

func (student *Student) format() {
	student.Student_name = strings.TrimSpace(student.Student_name)
}
