package api

import (
	"sort"
	"strings"

	"github.com/maldan/gam-app-memoman/internal/app/memoman/core"
	"github.com/maldan/go-cmhp/cmhp_crypto"
	"github.com/maldan/go-cmhp/cmhp_file"
	"github.com/maldan/go-restserver"
)

type NoteApi struct{}

// Get by id
func (r NoteApi) GetIndex(args ArgsId) core.Note {
	// Get file
	var item core.Note
	err := cmhp_file.ReadJSON(core.DataDir+"/note/"+args.Id+".json", &item)
	if err != nil {
		restserver.Fatal(500, restserver.ErrorType.NotFound, "id", "Note not found!")
	}
	return item
}

// Get list
func (r NoteApi) GetList() []core.Note {
	files, _ := cmhp_file.List(core.DataDir + "/note")
	out := make([]core.Note, 0)
	for _, file := range files {
		out = append(out, r.GetIndex(ArgsId{Id: strings.Replace(file.Name(), ".json", "", 1)}))
	}
	sort.SliceStable(out, func(i, j int) bool {
		return out[i].Created.Unix() > out[j].Created.Unix()
	})
	return out
}

// Create new
func (r NoteApi) PostIndex(args core.Note) {
	args.Id = cmhp_crypto.UID(10)
	cmhp_file.WriteJSON(core.DataDir+"/note/"+args.Id+".json", &args)
}

// Update
func (r NoteApi) PatchIndex(args core.Note) {
	cmhp_file.WriteJSON(core.DataDir+"/note/"+args.Id+".json", &args)
}

// Delete
func (r NoteApi) DeleteIndex(args ArgsId) {
	cmhp_file.Delete(core.DataDir + "/note/" + args.Id + ".json")
}
