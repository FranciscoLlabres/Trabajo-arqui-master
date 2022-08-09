package app

import (
	categoryController "mvc-go/controllers/category"
	detailController "mvc-go/controllers/detail"
	orderController "mvc-go/controllers/order"
	productController "mvc-go/controllers/product"
	userController "mvc-go/controllers/user"

	log "github.com/sirupsen/logrus"
)

func mapUrls() {
	// Category
	router.GET("/home", categoryController.GetCategories)

	// Products
	router.GET("/product/:id", productController.GetProductById)
	router.GET("/products", productController.GetProducts)
	router.GET("/products/category/:name", productController.GetProductsByCategoryName)
	router.GET("/search-products/:search", productController.GetProductsBySearch)

	// Details
	router.GET("/detail/:id", detailController.GetDetailsByOrderId)

	// Orders
	router.GET("/order/:id", orderController.GetOrdersByUserId)
	router.GET("/order", orderController.GetOrders)
	router.POST("/new-order", orderController.InsertOrder)

	// Users
	router.GET("/user/:id", userController.GetUserById)
	router.GET("/users", userController.GetUsers)
	router.GET("/login", userController.Login)
	router.POST("/user", userController.UserInsert)

	log.Info("Finishing mappings configuration")
}
