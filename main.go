package main

import (
	"github.com/nexentra/midgard/cmd"
)

var VERSION string

func main() {
	cmd.Version = VERSION
	cmd.Execute()
}
