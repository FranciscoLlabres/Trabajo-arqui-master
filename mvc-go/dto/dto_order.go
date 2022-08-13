package dto

import (
	"time"
)

type OrderDto struct {
	Id      int       `json:"id_order"`
	Total   float32   `json:"total"`
	Id_user int       `json:"id_user"`
	Date    time.Time `json:"fecha"`
	//entras a json de details
	Detail DetailsDto `json:"OrderDetails"`
}

type OrdersDto []OrderDto
