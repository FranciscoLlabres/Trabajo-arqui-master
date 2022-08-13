package services

import (
	detailCliente "mvc-go/clients/detail"
	"mvc-go/dto"
	"mvc-go/model"
	e "mvc-go/utils/errors"
)

type detailService struct{}

type detailServiceInterface interface {
	GetDetailsByOrderId(id int) (dto.DetailsDto, e.ApiError)
}

var (
	DetailService detailServiceInterface
)

func init() {
	DetailService = &detailService{}
}

func (s *detailService) GetDetailsByOrderId(id int) (dto.DetailsDto, e.ApiError) {

	var details model.Details = detailCliente.GetDetailsByOrderId(id)
	var detailsDto dto.DetailsDto

	if len(details) == 0 {
		return detailsDto, e.NewBadRequestApiError("orderDetail not found")
	}

	for _, orderDetailRes := range details {
		var detailDto dto.DetailDto
		detailDto.Id = orderDetailRes.Id_detail
		detailDto.Nombre = orderDetailRes.Nombre
		detailDto.Cantidad = orderDetailRes.Cantidad
		detailDto.PrecioUnitario = orderDetailRes.Precio_Unitario
		detailDto.Total = orderDetailRes.Total
		detailDto.Id_order = orderDetailRes.Id_order
		detailDto.Id_product = orderDetailRes.Id_product
		detailsDto = append(detailsDto, detailDto)
	}
	return detailsDto, nil
}
