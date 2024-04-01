package proc

import "github.com/nexentra/midgard/pkg/tasks"

func TaskList() {
	tasks.Tasks.PrintTasks()
}
