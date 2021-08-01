package core

import "time"

var DataDir = ""

type Todo struct {
	Id          string    `json:"id"`
	Priority    int       `json:"priority"`
	Description string    `json:"description"`
	Created     time.Time `json:"created"`
	Deadline    time.Time `json:"deadline"`
}
