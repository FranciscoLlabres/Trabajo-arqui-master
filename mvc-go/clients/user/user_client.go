package product

import (
	"mvc-go/dto"
	"mvc-go/model"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

var Db *gorm.DB

func GetUserById(id int) model.User {
	var user model.User

	Db.Where("id = ?", id).First(&user)
	log.Debug("User: ", user)

	return user
}

func GetUsers() model.Users {
	var users model.Users
	Db.Find(&users)

	log.Debug("Users: ", users)

	return users
}

func GetUserByUserName(loginDto dto.LoginDto) model.User {
	var user model.User

	Db.Where("user_name = ?", loginDto.UserName).First(&user)
	log.Debug("User: ", user)

	return user
}

func InsertUser(user model.User) model.User {
	result := Db.Create(&user)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("")
	}
	log.Debug("User Created: ", user.Id)
	return user
}