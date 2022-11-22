package dto

type DetailDto struct {
	Id             int     `json:"id_detail"`
	PrecioUnitario float32 `json:"precio_unitario"`
	Cantidad       float32 `json:"cantidad"`
	Total          float32 `json:"total"`
	Nombre         string  `json:"nombre"`
	Id_product     int     `json:"id_product"`
	Id_order       int     `json:"id_order"`
}

type DetailsDto []DetailDto
