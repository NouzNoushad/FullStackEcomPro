package main

import "log"

func main() {
	store, err := NewPostgresStore()
	if err != nil {
		log.Fatal(err)
	}

	if err := store.InitDB(); err != nil {
		log.Fatal(err)
	}

	server := NewAPIServer(":8004", store)

	server.Run()
}
