package main

import (
	"embed"

	helloworld "github.com/maldan/gam-app-memoman/internal/app/memoman"
)

//go:embed frontend/build/*
var frontFs embed.FS

func main() {
	helloworld.Start(frontFs) //
}
