package api

import (
	"sort"
	"strings"

	"github.com/maldan/gam-app-memoman/internal/app/memoman/core"
	"github.com/maldan/go-cmhp/cmhp_crypto"
	"github.com/maldan/go-cmhp/cmhp_file"
	"github.com/maldan/go-restserver"
)

type KnowledgeApi struct{}

// Get by id
func (r KnowledgeApi) GetIndex(args ArgsId) core.Knowledge {
	// Get file
	var item core.Knowledge
	err := cmhp_file.ReadJSON(core.DataDir+"/knowledge/"+args.Id+".json", &item)
	if err != nil {
		restserver.Fatal(500, restserver.ErrorType.NotFound, "id", "Knowledge not found!")
	}
	return item
}

// Get list
func (r KnowledgeApi) GetList() []core.Knowledge {
	files, _ := cmhp_file.List(core.DataDir + "/knowledge")
	out := make([]core.Knowledge, 0)
	for _, file := range files {
		out = append(out, r.GetIndex(ArgsId{Id: strings.Replace(file.Name(), ".json", "", 1)}))
	}
	sort.SliceStable(out, func(i, j int) bool {
		return out[i].Created.Unix() > out[j].Created.Unix()
	})
	return out
}

// Create new
func (r KnowledgeApi) PostIndex(args core.Knowledge) {
	args.Id = cmhp_crypto.UID(10)
	cmhp_file.WriteJSON(core.DataDir+"/knowledge/"+args.Id+".json", &args)
}

// Update
func (r KnowledgeApi) PatchIndex(args core.Knowledge) {
	cmhp_file.WriteJSON(core.DataDir+"/knowledge/"+args.Id+".json", &args)
}

// Delete
func (r KnowledgeApi) DeleteIndex(args ArgsId) {
	cmhp_file.Delete(core.DataDir + "/knowledge/" + args.Id + ".json")
}
