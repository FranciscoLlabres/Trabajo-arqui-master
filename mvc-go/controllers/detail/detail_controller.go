package orderController

import (
	"mvc-go/dto"
	service "mvc-go/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func GetDetailsByOrderId(c *gin.Context) {

	log.Debug("Order id to load: " + c.Param("id"))
	id, _ := strconv.Atoi(c.Param("id"))

	var detailsDto dto.DetailsDto
	detailsDto, err := service.DetailService.GetDetailsByOrderId(id)

	if err != nil {
		c.JSON(err.Status(), err)
		return
	}

	c.JSON(http.StatusOK, detailsDto)
}
