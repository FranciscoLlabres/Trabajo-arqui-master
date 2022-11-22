package model

type Category struct {
	Id   int    `gorm:"primaryKey"`
	Name string `gorm:"type:varchar(100)"`
}

type Categories []Category
