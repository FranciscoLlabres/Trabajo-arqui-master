package model

import (
	"time"
)

type Order struct {
	Id      int       `gorm:"primaryKey"`
	Fecha   time.Time `gorm:"type:decimal(60,4);not null"`
	Total   float32   `gorm:"type:varchar(150);not null"`
	Id_user int       `gorm:"type:varchar(150);not null"`
}

type Orders []Order
