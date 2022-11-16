import React, { useState } from "react";
import Cookies from "universal-cookie";

const Cookie = new Cookies();


async function getUserById(id) {
  return fetch("http://localhost:8090/user/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}

async function getProductById(id) {
  return fetch("http://localhost:8090/product/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}

async function getOrderById(id) {
  return fetch("http://localhost:8090/order/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}


function goto(path) {
  window.location = window.location.origin + path
}

function logout() {
  Cookie.set("id_user", -1, { path: "/" })
  window.location.reload();
}


function showProducts(products) {
  return products.map((product) =>
    <div>
      <div obj={product} key={product.product_id} className="product">
        <div>
          <img width="128px" height="128px" src={"../images/" + product.picture_url} onError={(e) => (e.target.onerror = null, e.target.src = "../images/default.jpg")} />
        </div>
        <a className="name">{product.name}</a>
        <a className="price">{product.currency_id + "$" + product.base_price}</a>
        <div>
          <a className="description">{product.description}</a>
        </div>
        <div className="right">
          <a className="category">{product.category.name}</a>
          <a className="stock">Stock: {product.stock}</a>
        </div>
      </div>
      <div className="quantity">
        <h1 className="amount"> Amount: </h1>
        <h1 className="number"> {product.quantity} </h1>
        <h1 className="subtotal"> Subtotal: ${product.quantity * product.base_price} </h1>
      </div>
    </div>
  )
}

function showAddress(address) {
  return (
    <div className="orderAddress">
      ADDRESS N°{address.address_id}
      <div><span className="orderAddressInfo"> Street: </span> <a className="orderAddressInfoLoad">{address.street1}</a> </div>
      <div><span className="orderAddressInfo"> Street2: </span> <a className="orderAddressInfoLoad">{address.street2} </a> </div>
      <div><span className="orderAddressInfo"> Number: </span> <a className="orderAddressInfoLoad">{address.number} </a> </div>
      <div><span className="orderAddressInfo"> District: </span> <a className="orderAddressInfoLoad">{address.district} </a> </div>
      <div><span className="orderAddressInfo"> City: </span> <a className="orderAddressInfoLoad">{address.city} </a> </div>
      <div><span className="orderAddressInfo"> Country: </span> <a className="orderAddressInfoLoad">{address.country} </a> </div>
    </div>
  )
}

async function getOrderProducts() {
  let items = []
  let a = Cookie.get("order").split(";")

  for (let i = 0; i < a.length; i++) {
    let item = a[i];
    if (item != "") {
      let array = item.split(",")
      let id = array[0]
      let quantity = array[1]
      let product = await getProductById(id)
      product.quantity = quantity;
      items.push(product)
    }
  }
  return items
}


async function getAddressById(id) {
  return fetch("http://localhost:8090/address/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}


//SET ORDER

async function setOrder(setOrder, setTotal) {
  let total = 0;
  await getOrderProducts().then(response => {
    setOrder(response)
    response.forEach((item) => {
      total += item.base_price * item.quantity;
    });
    setTotal(total);
  })
}

function Order(){
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [orderProducts, setOrderProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState({})

  if (Cookie.get("id_user") > -1 && !isLogged) {
    getUserById(Cookie.get("id_user")).then(response => setUser(response))
    setIsLogged(true)

    if (Cookie.get("address") > -1){
      getAddressById(Cookie.get("address")).then(response => setAddress(response))
    }
  }

  if (orderProducts.length <= 0 && Cookie.get("id_user") > -1){
    setOrder(setOrderProducts, setTotal)
  }
}

const complete = (
  <div>
  <div> ORDEN </div>
  {address.id_address != undefined ? showAddress(address) : <span>A</span>}
  {showProducts(orderProducts)}

  <div> Total: $$${total} </div>
  </div>        
)

const error = (
  <div>
  <div> ERROR : (((( </div>
  <div> Stock problems </div>
  <div> Error {Cookie.get("orderError")} </div>
  <h1> X </h1>
  </div>
)

return (
  <div className="status">
    <div className="topnav">
      <img src={logo} width="80px" height="80px" id="logo" onClick={()=>goto("/")} />
      {isLogged ? login : <a id="login" onClick={() => goto("/login")}>Login</a>}
    </div>



    <div id="main">
      {window.location.pathname.split("/")[2] == "complete" ? complete : error}
    </div>
  </div>
);
export default Order;