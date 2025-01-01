package controllers

import (
	"api/src/db"
	"api/src/models"
	"api/src/repositories"
	returnAnswers "api/src/return_answers"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

func CreateStudent(w http.ResponseWriter, r *http.Request) {
    // Defina o cabeçalho da resposta antes de enviar qualquer dado
    w.Header().Set("Content-Type", "application/json")

    // Lê o corpo da requisição
    bodyRequest, err := io.ReadAll(r.Body)
    if err != nil {
        log.Println("Erro ao ler o corpo da requisição:")
        returnAnswers.Err(w, http.StatusUnprocessableEntity, err)
        return
    }
    defer r.Body.Close()

    var student models.Student
    // Deserializa os dados JSON para o modelo Student
    if err := json.Unmarshal(bodyRequest, &student); err != nil {
        log.Println("Erro ao deserializar o corpo da requisição:")
        returnAnswers.Err(w, http.StatusBadRequest, err)
        return
    }

    if err = student.Prepare(); err != nil {
        log.Println("Erro ao validar/formatar o corpo da requisição:")
        returnAnswers.Err(w, http.StatusBadRequest, err)
        return
    }

    // Obtém a conexão com o banco de dados
    db, err := db.Conn()
    if err != nil {
        log.Println("Erro ao conectar ao banco de dados:")
        returnAnswers.Err(w, http.StatusInternalServerError, err)
        return
    }
    defer db.Close()

    // Cria o repositório e insere o estudante
    repository := repositories.NewStudentRepository(db)
    student.ID, err = repository.Create(student)
    if err != nil {
        log.Println("Erro ao criar o estudante:")
        returnAnswers.Err(w, http.StatusInternalServerError, err)
        return
    }

    // Retorna a resposta com o estudante criado
    returnAnswers.JSON(w, http.StatusCreated, student)
}

func SearchStudents(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("Buscando estudantes!"))
}
func SearchStudent(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("Buscando um estudante!"))
}
func UpdateStudent(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("Atualizando estudante!"))
}
func DeleteStudent(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("Removendo estudante!"))
}