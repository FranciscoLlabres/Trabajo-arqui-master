package dto

type OrderDto struct {
	Id      int        `json:"id_order"`
	Total   float32    `json:"total"`
	Id_user int        `json:"id_user"`
	Date    string     `json:"date"`
	Detail  DetailsDto `json:"OrderDetails"`
}

type OrdersDto []OrderDto
