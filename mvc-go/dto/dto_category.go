package dto

type CategoryDto struct {
	Id   int    `json:"id_category"`
	Name string `json:"name"`
}

type CategoriesDto []CategoryDto
