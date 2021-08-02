package api

import (
	"sort"
	"strings"

	"github.com/maldan/gam-app-memoman/internal/app/memoman/core"
	"github.com/maldan/go-cmhp/cmhp_crypto"
	"github.com/maldan/go-cmhp/cmhp_file"
	"github.com/maldan/go-restserver"
)

type TodoApi struct{}

// Get by id
func (r TodoApi) GetIndex(args ArgsId) core.Todo {
	// Get file
	var item core.Todo
	err := cmhp_file.ReadJSON(core.DataDir+"/todo/"+args.Id+".json", &item)
	if err != nil {
		restserver.Fatal(500, restserver.ErrorType.NotFound, "id", "Todo not found!")
	}
	return item
}

// Get list
func (r TodoApi) GetList() []core.Todo {
	files, _ := cmhp_file.List(core.DataDir + "/todo")
	out := make([]core.Todo, 0)
	for _, file := range files {
		out = append(out, r.GetIndex(ArgsId{Id: strings.Replace(file.Name(), ".json", "", 1)}))
	}
	sort.SliceStable(out, func(i, j int) bool {
		return out[i].Priority > out[j].Priority
	})
	return out
}

// Create new
func (r TodoApi) PostIndex(args core.Todo) {
	args.Id = cmhp_crypto.UID(10)
	cmhp_file.WriteJSON(core.DataDir+"/todo/"+args.Id+".json", &args)
}

// Update
func (r TodoApi) PatchIndex(args core.Todo) {
	cmhp_file.WriteJSON(core.DataDir+"/todo/"+args.Id+".json", &args)
}

// Delete
func (r TodoApi) DeleteIndex(args ArgsId) {
	cmhp_file.Delete(core.DataDir + "/todo/" + args.Id + ".json")
}
