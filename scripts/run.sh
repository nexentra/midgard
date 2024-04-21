#!/bin/bash

if [ $# -eq 0 ]; then
    run_frontend=true
    run_backend=true
else
    if [ "$1" == "frontend" ]; then
        run_frontend=true
        run_backend=false
    elif [ "$1" == "backend" ]; then
        run_frontend=false
        run_backend=true
    else
        echo "Invalid argument. Usage: $0 [frontend|backend]"
        exit 1
    fi
fi

tmux new-session -d bash
tmux split-window -h bash

if [ "$run_frontend" = true ]; then
    tmux send -t 0:0.0 "cd ./client && yarn dev" C-m
fi

if [ "$run_backend" = true ]; then
    tmux send -t 0:0.1 "GOFLAGS=-mod=mod go run ./ start" C-m
fi

tmux -2 attach-session -d
