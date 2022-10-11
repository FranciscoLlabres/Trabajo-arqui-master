import React, { useState } from "react";
import Cookies from "universal-cookie";

const Cookie = new Cookies();

async function getUserById(id) {
    return await fetch('https://localhost:8080/user/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(response => response.json())
}

async function getProductById(id) {
    return await fetch('https://localhost:8080/product/' + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(response => response.json())
}

async function getCategories() {
    return await fetch('https://localhost:8080/categories', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(response => response.json())
}

async function getProducts() {
    return await fetch('https://localhost:8080/products', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(response => response.json())
}

function goto(path) {
    window.location = window.location.origin + path
}

function retry() {
    goto("/")
}

function showCategories(categories) {
    return categories.map((category, i) => <a onClick={() => goto("/")} obj={category} key={category.id_category}>{category.name}</a>)
}

function Product() {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState({})
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState("")
    const [cartItems, setCartItems] = useState("")

    if (Cookie.get("user_id") > -1 && !isLogged) {
        getUserById(Cookie.get("user_id")).then(response => setUser(response))
        setIsLogged(true)
    }

    if (!(Cookie.get("user_id") > -1) && isLogged) {
        setIsLogged(false)
    }

    if (categories.length <= 0) {
        getCategories().then(response => setCategories(response))
    }

    if (!cartItems && Cookie.get("cartItems")) {
        setCartItems(Cookie.get("cartItems"))
    }

    if (!(product.product_id > -1)) {
        let id = window.location.search.split("=")[1]
        getProductById(Number(id)).then(response => { setProduct(response); })
    }

    const login = (
        <span>
            <img src={usersvg} onClick={() => goto("/user")} id="user" width="48px" height="48px" />
            <img src={cart} onClick={() => goto("/cart ")} id="cart" width="48px" height="48px" />
            <span className="cartNumber">{cartItems > 0 ? cartItems : 0}</span>
            <a id="logout" onClick={logout}> <span> Welcome in {user.first_name} </span> </a>
        </span>
    )
    const loading = (
        <img id="loading" src={loadinggif} />
    )

    return (
        <div className="home">
          <div className="topnav">
            <div>
              <img src={logo} width="80px" height="80px" id="logo" onClick={()=>goto("/")} /> <p>3 Random Words Shop</p>
            </div>
            {isLogged ? login : <a id="login" onClick={()=>goto("/login")}>Login</a>}
          </div>
    
    
          <div id="mySidenav" className="sidenav">
    
            {categories.length > 0 ? showCategories(categories) : <a onClick={retry}> Loading Failed. Click to retry </a>}
          </div>
    
          <div id="main">
            {product.product_id > -1 ? showProduct(product, setCartItems) : <a> Bad Request </a>}
    
          </div>
        </div>
      );

}

export default Product;