package dto

//Actualizar con model
type ProductDto struct {
	Id          int     `json:"id_product"`
	Name        string  `json:"name"`
	Price       float32 `json:"price"`
	Picture     string  `json:"picture_url"`
	Stock       int     `json:"stock"`
	Id_category int     `json:"id_category"`
	Description string  `json:"description"`
}

type ProductsDto []ProductDto
