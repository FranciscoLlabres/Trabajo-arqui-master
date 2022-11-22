package dto

type UserDto struct {
	Id        int    `json:"id_user"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	UserName  string `json:"user_name"`
	Password  string `json:"password"`
	Address   string `json:"address"`
	Email     string `json:"email"`
}

type UsersDto []UserDto

type LoginDto struct {
	UserName string `json:"user_name"`
	Password string `json:"password"`
}
