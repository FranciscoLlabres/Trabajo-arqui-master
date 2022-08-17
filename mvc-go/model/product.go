package model

type Product struct {
	Id          int     `gorm:"primaryKey"`
	Id_category int     `gorm:"type:varchar(150)"`
	Name        string  `gorm:"type:varchar(350);not null;unique;"`
	Picture     string  `gorm:"type:varchar(350)"`
	Price       float32 `gorm:"type:varchar(150);not null"`
	Stock       int     `gorm:"type:varchar(150)"`
	Description string  `gorm:"type:varchar(255);not null;"`
}

type Products []Product
