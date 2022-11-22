package dto

import (
	"time"
)

type OrderDto struct {
	Id      int       `json:"id_order"`
	Id_user int       `json:"id_user"`
	Fecha   time.Time `json:"fecha"`
	Total   float32   `json:"total"`
	//entras a json de details
	Detail DetailsDto `json:"OrderDetails"`
}

type OrdersDto []OrderDto
