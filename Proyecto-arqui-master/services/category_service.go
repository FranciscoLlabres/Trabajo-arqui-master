package services

import (
	categoryCliente "mvc-go/clients/category"
	"mvc-go/dto"
	"mvc-go/model"
	e "mvc-go/utils/errors"
)

type categoryService struct{}

type categoryServiceInterface interface {
	GetCategories() (dto.CategoriesDto, e.ApiError)
}

var (
	CategoryService categoryServiceInterface
)

func init() {
	CategoryService = &categoryService{}
}

func (s *categoryService) GetCategories() (dto.CategoriesDto, e.ApiError) {

	var categories model.Categories = categoryCliente.GetCategories()
	var categoriesDto dto.CategoriesDto

	for _, category := range categories {
		var categoryDto dto.CategoryDto
		categoryDto.Id = category.Id
		categoryDto.Name = category.Name

		categoriesDto = append(categoriesDto, categoryDto)
	}

	return categoriesDto, nil
}
