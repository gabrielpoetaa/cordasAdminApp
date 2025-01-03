package main

import (
	"api/src/config"
	"api/src/router"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Carrega as variáveis de ambiente
	config.LoadEnv()

	// Gera o roteador
	r := router.GerarRouter()

	// Aplica o middleware CORS no roteador (agora r é *mux.Router, e CORS será aplicado)
	handlerWithCORS := config.ConfigCORS(r)

	// Inicia o servidor na porta configurada
	fmt.Printf("Servidor rodando na porta %d\n", config.Port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", config.Port), handlerWithCORS))
}