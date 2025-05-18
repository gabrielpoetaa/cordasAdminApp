package db

import (
	"api/src/config"
	"fmt"
	"testing"
)

func TestDatabaseConnection(t *testing.T) {
	// Load environment variables
	config.LoadEnv()

	fmt.Printf("Trying to connect with string: %s\n", config.DbConnectionString)

	// Try to establish connection
	db, err := Conn()
	if err != nil {
		t.Fatalf("Failed to connect to database: %v", err)
		return
	}
	defer db.Close()

	// Test the connection with a simple ping
	err = db.Ping()
	if err != nil {
		t.Fatalf("Failed to ping database: %v", err)
		return
	}

	t.Log("Successfully connected to database")
} 