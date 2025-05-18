package config

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

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

	// Get the current working directory
	workDir, err := os.Getwd()
	if err != nil {
		log.Printf("Error getting working directory: %v\n", err)
	}

	// Navigate up to the api root if we're in a subdirectory
	if strings.Contains(workDir, "src") {
		workDir = filepath.Join(workDir, "..", "..")
	}

	// Try to load .env from the api root directory
	envPath := filepath.Join(workDir, ".env")
	log.Printf("Trying to load .env from: %s\n", envPath)
	
	if err = godotenv.Load(envPath); err != nil {
		log.Printf("Error loading .env file: %v\n", err)
	}

	Port, err = strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		Port = 9000
		log.Printf("Using default port: %d\n", Port)
	}

	DbConnectionString = os.Getenv("STRING_CONEXAO")
	if DbConnectionString == "" {
		log.Fatal("STRING_CONEXAO environment variable is not set")
	}
	fmt.Printf("Loaded connection string: %s\n", DbConnectionString)

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