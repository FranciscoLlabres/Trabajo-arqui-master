import React, { useState } from "React";
import Cookies from "universal-cookie"

const Cookie = new Cookies();

async function getUserById(id) {
  return await fetch('http://localhost:8090/user/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())

}

async function getCategories() {
  return await fetch('http://localhost:8090/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())

}

async function getProducts() {
  return await fetch('http://localhost:8090/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

async function getProductsByCategoryId(id) {
  return await fetch('http://localhost:8090/product/' + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}

function goto(path) {
  window.location = window.location.origin + path
}

async function getProductBySearch(query) {
  return fetch("http://localhost:8090/search-products/search=" + query, {
    method: "GET",
    header: "Content-Type: application/json"
  }).then(response => response.json())
}

function goto(path) {
  window.location = window.location.origin + path
}

function retry() {
  goto("/")
}

function logout() {
  Cookie.set("user_id", -1, { path: "/" })
  document.location.reload()
}

function productsByCategoryId(id, setter, categorySetter) {
  getProductsByCategoryId(id).then(response => { setter(response); Cookie.set("category", id); getCategoryById(id).then(category => categorySetter(category)) })
}

function showCategories(categories, setter, categorySetter) {
  return categories.map((category, i) => <a onClick={() => productsByCategoryId(category.category_id, setter, categorySetter)} obj={category} key={category.category_id}>{category.name}</a>)
}



function ProductsView(products, setCartItems) {
  return products.map((product) =>

    <div obj={product} key={product.product_id} className="product">
      <div onClick={() => goto("/product?id=" + product.product_id)}>
        <img width="128px" height="128px" src={"./images/" + product.picture_url} onError={(e) => (e.target.onerror = null, e.target.src = "./images/default.jpg")} />
      </div>
      <a className="name">{product.name}</a>
      <a className="addcart" onClick={() => addToCart(product.product_id, setCartItems)}>Add to Cart</a>
      <a className="price">{product.currency_id + "$" + product.base_price}</a>
      <div>
        <a className="description">{product.description}</a>
      </div>
      <div className="right">
        <a className="category">{product.category.name}</a>
        <a className="stock">Stock: {product.stock}</a>
      </div>
    </div>
  )
}

function Home() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({})
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [needProducts, setNeedProducts] = useState(true)
  const [category, setCategory] = useState("")
  const [needCategories, setNeedCategories] = useState(true)
  const [cartItems, setCartItems] = useState("")
  const [failedSearch, setFailedSearch] = useState(false)


  if (Cookie.get("user_id") > -1 && !isLogged) {
    getUserById(Cookie.get("user_id")).then(response => setUser(response))
    setIsLogged(true)
  }

  if (!(Cookie.get("user_id") > -1) && isLogged) {
    setIsLogged(false)
  }

  if (!categories.length && needCategories) {
    getCategories().then(response => setCategories(response))
    setNeedCategories(false)
  }

  if (!products.length && needProducts) {
    getProducts().then(response => setProducts(response))
    setNeedProducts(false)
  }


  if (!cartItems && Cookie.get("cartItems")) {
    setCartItems(Cookie.get("cartItems"))
  }

  async function searchQuery(query){

    await getProductBySearch(query).then(response=>{
      console.log(query)
      if(response != null){
        if(response.length > 0){
          setProducts(response)
          setFailedSearch(false)
        }else{
          setProducts([])
          setFailedSearch(true)
        }
      }
      else{
        setFailedSearch(false)
        getProducts().then(response=>setProducts(response))
      }
    })


  }

 

}







