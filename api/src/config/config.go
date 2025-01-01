package config

import (
	"log"
	"os"
	"strconv"

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