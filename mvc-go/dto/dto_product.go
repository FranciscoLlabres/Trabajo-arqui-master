package dto

//Actualizar con model
type ProductDto struct {
	Id          int     `json:"id_product"`
	Name        string  `json:"name"`
	Picture     string  `json:"picture_url"`
	Price       float32 `json:"price"`
	Id_category int     `json:"id_category"`
	Stock       int     `json:"quantity"`
}

type ProductsDto []ProductDto
