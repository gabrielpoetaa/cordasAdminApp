package db

import (
	"api/src/config"
	"database/sql"
	"strings"

	_ "github.com/lib/pq"
)

func Conn() (*sql.DB, error) {
	// Ensure the connection string uses the correct prefix for pq driver
	connectionString := config.DbConnectionString
	if strings.HasPrefix(connectionString, "postgresql://") {
		connectionString = "postgres://" + connectionString[13:]
	}

	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}