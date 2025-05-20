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
	ID                   uint64   `json:"id,omitempty"`
	Student_name         string   `json:"student_name,omitempty"`
	Date_of_birth        string   `json:"date_of_birth,omitempty"`
	CPF                  string   `json:"cpf,omitempty"`
	Email                string   `json:"email,omitempty"`
	Previous_knowledge   bool     `json:"Previous_knowledge,omitempty"`
	Participate_projects bool     `json:"Participate_projects,omitempty"`
	Music_preferences    []string `json:"Music_Preferences,omitempty"`
	How_did_you_find_us  []string `json:"How_did_you_find_us,omitempty"`
	Courses             []Course  `json:"courses,omitempty"`
}

type Course struct {
	CourseName  string `json:"course_name,omitempty"`
	TeacherName string `json:"teacher_name,omitempty"`
}

func (student *Student) Prepare() error {
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

		if fieldType.Kind() == reflect.String || fieldType.Kind() == reflect.Slice {
			if field.String() == "" {
				return errors.New ("Campo " + typeOfT.Field(i).Name + " é obrigatório")
			}
			if field.Len() == 0 {
				return errors.New("Campo " + typeOfT.Field(i).Name + " é obrigatório")
			}
		}

	}

	// if student.Student_name == "" {
	// 	return errors.New("O nome é obrigatório!")
	// }

	return nil
}

func (student *Student) format() {
	student.Student_name = strings.TrimSpace(student.Student_name)
}