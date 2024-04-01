package logger

import (
	"github.com/labstack/gommon/log"
)

type LogLevel string

const (
	DebugLvl LogLevel = "debug"
	InfoLvl  LogLevel = "info"
	WarnLvl  LogLevel = "warn"
	ErrorLvl LogLevel = "error"
	FatalLvl LogLevel = "fatal"
	PanicLvl LogLevel = "panic"
)

func getLogLevel(lvl string) log.Lvl {
	switch lvl {
	case string(DebugLvl):
		return 1
	case string(InfoLvl):
		return 2
	case string(WarnLvl):
		return 3
	case string(ErrorLvl):
		return 4
	case string(FatalLvl):
		return 7
	case string(PanicLvl):
		return 6
	default:
		return 5
	}
}
