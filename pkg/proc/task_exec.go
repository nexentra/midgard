package proc

import (
	"fmt"

	"github.com/nexentra/midgard/pkg/tasks"
	"github.com/nexentra/midgard/pkg/utils"
)

func TaskExec(args []string) {
	if len(args) < 1 {
		fmt.Println("Please provide a task name")
		return
	}
	taskName := args[0]
	task := tasks.Tasks.GetTask(taskName)
	if task == nil {
		fmt.Println("Task not found")
		return
	}
	taskArgs := utils.ResolveArgs(args[1:])
	if err := task.Execute(taskArgs); err != nil {
		fmt.Println(err)
	}
}
