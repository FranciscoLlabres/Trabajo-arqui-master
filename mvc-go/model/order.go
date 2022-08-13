package model

import (
	"time"
)

type Order struct {
	Id      int       `gorm:"primaryKey"`
	Id_user int       `gorm:"type:varchar(150);not null"`
	Date    time.Time `gorm:"not null"`
	Total   float32   `gorm:"type:varchar(150);not null"`
}

type Orders []Order
