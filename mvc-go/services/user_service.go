package services

import (
	userCliente "mvc-go/clients/user"
	"mvc-go/dto"
	"mvc-go/model"
	e "mvc-go/utils/errors"

	"golang.org/x/crypto/bcrypt"
)

type userService struct{}

type userServiceInterface interface {
	GetUserById(id int) (dto.UserDto, e.ApiError)
	GetUsers() (dto.UsersDto, e.ApiError)
	LoginUser(loginDto dto.LoginDto) (dto.TokenDto, e.ApiError)
	InsertUser(userDto dto.UserDto) (dto.UserDto, e.ApiError)
}

var (
	UserService userServiceInterface
)

func init() {
	UserService = &userService{}
}

func (s *userService) GetUserById(id int) (dto.UserDto, e.ApiError) {

	var user model.User = userCliente.GetUserById(id)
	var userDto dto.UserDto

	if user.Id == 0 {
		return userDto, e.NewBadRequestApiError("user not found")
	}
	userDto.FirstName = user.FirstName
	userDto.LastName = user.LastName
	userDto.UserName = user.UserName
	userDto.Id = user.Id
	userDto.Password = user.Password
	userDto.Address = user.Address
	userDto.Email = user.Email
	return userDto, nil
}

func (s *userService) GetUsers() (dto.UsersDto, e.ApiError) {

	var users model.Users = userCliente.GetUsers()
	var usersDto dto.UsersDto

	for _, user := range users {
		var userDto dto.UserDto
		userDto.FirstName = user.FirstName
		userDto.LastName = user.LastName
		userDto.UserName = user.UserName
		userDto.Id = user.Id
		userDto.Password = user.Password
		userDto.Address = user.Address
		userDto.Email = user.Email

		usersDto = append(usersDto, userDto)
	}

	return usersDto, nil
}

//login con el uso de hash

func (s *userService) LoginUser(loginDto dto.LoginDto) (dto.TokenDto, e.ApiError) {
	var tokenDto dto.TokenDto //genera un token dto vacio

	user := userCliente.GetUserByUserName(loginDto)

	if user.Id == 0 {
		return tokenDto, e.NewBadRequestApiError("user not found")
	}

	hash, _ := HashPassword(user.Password)

	match := CheckPasswordHash(loginDto.Password, hash)

	if match == true {
		tokenDto.Token = hash
		return tokenDto, nil
	} else {
		return tokenDto, e.NewBadRequestApiError("Bad password")
	}

}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (s *userService) InsertUser(userDto dto.UserDto) (dto.UserDto, e.ApiError) {

	var user model.User

	user.FirstName = userDto.FirstName
	user.LastName = userDto.LastName
	user.UserName = userDto.UserName
	user.Password = userDto.Password
	user.Address = userDto.Address
	user.Email = userDto.Email

	user = userCliente.InsertUser(user)

	userDto.Id = user.Id

	return userDto, nil
}
