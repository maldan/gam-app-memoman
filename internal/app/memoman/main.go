package memoman

import (
	"embed"
	"flag"
	"fmt"

	"github.com/maldan/gam-app-memoman/internal/app/memoman/api"
	"github.com/maldan/gam-app-memoman/internal/app/memoman/core"
	"github.com/maldan/go-restserver"
)

func Start(frontFs embed.FS) {
	// Server
	var host = flag.String("host", "127.0.0.1", "Server Hostname")
	var port = flag.Int("port", 16000, "Server Port")
	_ = flag.Int("clientPort", 8080, "Client Port")

	// Data
	var dataDir = flag.String("dataDir", "db", "Data Directory")
	_ = flag.String("appId", "id", "App id")
	flag.Parse()

	// Set
	core.DataDir = *dataDir

	// Init server
	restserver.Start(fmt.Sprintf("%s:%d", *host, *port), map[string]interface{}{
		"/": restserver.VirtualFs{Root: "frontend/build/", Fs: frontFs},
		"/api": map[string]interface{}{
			"todo":      api.TodoApi{},
			"note":      api.NoteApi{},
			"knowledge": api.KnowledgeApi{},
		},
	})
}
