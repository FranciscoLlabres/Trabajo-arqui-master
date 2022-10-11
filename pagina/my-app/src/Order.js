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


function showProducts(products){
    return products.map((product) =>
     <div>
     <div obj={product} key={product.product_id} className="product">
      <div>
        <img width="128px" height="128px" src={"../images/" + product.picture_url}  onError={(e) => (e.target.onerror = null, e.target.src = "../images/default.jpg")}/>
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
  
   function showAddress(address){
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