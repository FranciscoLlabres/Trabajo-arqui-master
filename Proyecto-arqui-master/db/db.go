package db

import (
	cartClient "mvc-go/clients/cart"
	categoryClient "mvc-go/clients/category"
	detailClient "mvc-go/clients/detail"
	orderClient "mvc-go/clients/order"
	productClient "mvc-go/clients/product"
	userClient "mvc-go/clients/user"
	"mvc-go/model"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	log "github.com/sirupsen/logrus"
)

var (
	db  *gorm.DB
	err error
)

func init() {
	// DB Connections Paramters
	DBName := "arquidesoft"
	DBUser := "root"
	DBPass := ""
	//DBPass := os.Getenv("MVC_DB_PASS")
	DBHost := "localhost"
	// ------------------------

	db, err = gorm.Open("mysql", DBUser+":"+DBPass+"@tcp("+DBHost+":3306)/"+DBName+"?charset=utf8&parseTime=True")

	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}

	// build cliente/añadir
	categoryClient.Db = db
	productClient.Db = db
	userClient.Db = db
	orderClient.Db = db
	detailClient.Db = db
	cartClient.Db = db

}

func StartDbEngine() {
	// Migracion de clases
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Product{})
	db.AutoMigrate(&model.Category{})
	db.AutoMigrate(&model.Order{})
	db.AutoMigrate(&model.Detail{})
	db.AutoMigrate(&model.Cart{})

	log.Info("Finishing Migration Database Tables")
}
