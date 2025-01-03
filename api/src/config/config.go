package config

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/joho/godotenv"
)

var (
	DbConnectionString = ""
	Port               = 0
)

func LoadEnv() {
	var err error

	if err = godotenv.Load(); err != nil {
	log.Fatal()
	}

	Port, err = strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		Port = 9000
	}

	DbConnectionString = os.Getenv("STRING_CONEXAO")


	// fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True&loc=Local",
	// 	os.Getenv("DB_USER"),
	// 	os.Getenv("DB_PASSWORD"),
	// 	os.Getenv("DB_NOME"),
	// )
}

func ConfigCORS(r *mux.Router) http.Handler {
	// Configurações de CORS
	corsOptions := cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // Origem permitida (frontend)
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"}, // Métodos permitidos
		AllowedHeaders: []string{"Content-Type", "Authorization"}, // Cabeçalhos permitidos
	}

	// Aplica o middleware CORS no roteador e retorna
	return cors.New(corsOptions).Handler(r) // Retorna o http.Handler com CORS aplicado
}