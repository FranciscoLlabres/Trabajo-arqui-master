package model

type Product struct {
	Id          int     `gorm:"primaryKey"`
	Name        string  `gorm:"type:varchar(350);not null;unique;"`
	Price       float32 `gorm:"type:varchar(150);not null"`
	Picture     string  `gorm:"type:varchar(350)"`
	Stock       int     `gorm:"type:varchar(150)"`
	Id_category int     `gorm:"type:varchar(150)"`
	Description string  `gorm:"type:varchar(255);not null;"`
}

type Products []Product
