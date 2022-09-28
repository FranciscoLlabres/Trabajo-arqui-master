import React, { useState } from "React";
import Cookies from "universal-cookie";

const Cookie = new Cookies();

function goto(path) {
    window.location = window.location.origin + path
}

async function login(username, password) {
    return await fetch('https://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": password })
    })
        .then(response => {
            if (response.status == 400 || response.status == 401) {
                return { "id_user": -1 }
            }
            return response.json()
        })
        .then(response => {
            Cookie.set("id_user", response.id, { path: '/' })
            Cookie.set("username", username, { path: '/login' })
        })


}

function Login() {

    const handleSubmit = (event) => {

        var { username, password } = document.forms[0];

        event.preventDefault();

        // Busca la informacion del usuario
        const userData = login(username.value, password.value).then(data => {
            if (Cookie.get("id_user") > -1) {
                goto("/")
            }
            else if (Cookie.get("id_user") == -1) {
                setErrorMessages({ name: "default", message: error })
            }
        })
    };

    const renderForm = ( 
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (

        <div className="app">
          <div className="login-form">
            <div className="title">BIENVENIDOS</div>
    
            {isSubmitted || Cookie.get("user_id") > -1 ? Cookie.get("username") : renderForm}
          </div>
        </div>
      );
    

}

export default Login;