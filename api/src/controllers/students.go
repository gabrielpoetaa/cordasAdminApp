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
        log.Printf("[ERROR] Erro ao ler o corpo da requisição: %v", err)
        returnAnswers.Err(w, http.StatusUnprocessableEntity, err)
        return
    }
    defer r.Body.Close()

    // Log do corpo da requisição
    log.Printf("[INFO] Corpo da requisição recebido: %s", string(bodyRequest))

    var student models.Student
    // Deserializa os dados JSON para o modelo Student
    if err := json.Unmarshal(bodyRequest, &student); err != nil {
        log.Printf("[ERROR] Erro ao deserializar o corpo da requisição: %v", err)
        returnAnswers.Err(w, http.StatusBadRequest, err)
        return
    }

    // Log dos dados do estudante após deserialização
    log.Printf("[INFO] Dados do estudante após deserialização: %+v", student)
    log.Printf("[INFO] Números de telefone recebidos: %+v", student.MobileNumberStrings)

    if err = student.Prepare(); err != nil {
        log.Printf("[ERROR] Erro ao validar/formatar o corpo da requisição: %v", err)
        returnAnswers.Err(w, http.StatusBadRequest, err)
        return
    }

    // Log dos dados após preparação
    log.Printf("[INFO] Dados do estudante após preparação: %+v", student)
    log.Printf("[INFO] Números de telefone convertidos: %+v", student.Phones)

    // Obtém a conexão com o banco de dados
    db, err := db.Conn()
    if err != nil {
        log.Printf("[ERROR] Erro ao conectar ao banco de dados: %v", err)
        returnAnswers.Err(w, http.StatusInternalServerError, err)
        return
    }
    defer db.Close()

    // Cria o repositório e insere o estudante
    repository := repositories.NewStudentRepository(db)
    student.ID, err = repository.Create(student)
    if err != nil {
        log.Printf("[ERROR] Erro ao criar o estudante: %v", err)
        returnAnswers.Err(w, http.StatusInternalServerError, err)
        return
    }

    

    // Log do estudante antes de retornar
    log.Printf("[INFO] Estudante antes de retornar: %+v", student)
    log.Printf("[INFO] Telefones antes de retornar: %+v", student.Phones)

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