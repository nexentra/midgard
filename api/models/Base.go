package models


import (
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type Base struct {
	ID          uuid.UUID      `gorm:"primary_key;type:uuid;" json:"id"`
	CreatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
}

func (base *Base) BeforeCreate(scope *gorm.Scope) error {
	uuid := uuid.New()
	return scope.SetColumn("ID", uuid)
}