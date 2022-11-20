import React, { useState } from "react";
import Cookies from "universal-cookie";

const Cookie = new Cookies()

async function getUserById(id) {
  return await fetch('http://localhost:8090/user/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())

}

async function getOrdersByUserId(id) {
  return await fetch('http://localhost:8090/order/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())

}

//Faltan addresses (async function)


function goto(path) {
  window.location = window.location.origin + path
}


function logout() {
  Cookie.set("id_user", -1, { path: "/" })
  document.location.reload()
}


function showUserOrders(orders) {
  return orders.map((order) =>

    <div obj={order} key={order.id_order} className="order" onClick={() => showDetails(order.id_order)}>
      <a className="ordern">Order N°: {order.id_order}</a>
      <a className="date">Date: {order.fecha.split("T")[0]}</a>
      <a className="total">Total: <span>{"$" + order.total} </span></a>

      <div className={"details" + " o" + order.id_order + " hidden"}>
        <table>
          {getDetails(order.details)}
        </table>
      </div>

    </div>
  )
}

function User() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({})
  const [cartItems, setCartItems] = useState("")
  const [orders, setOrders] = useState([])
  const [addresses, setAddresses] = useState([])


  if (Cookie.get("id_user") > -1 && !isLogged) {
    getUserById(Cookie.get("id_user")).then(response => setUser(response))
    setIsLogged(true)

    if (Cookie.get("orders") == undefined) {
      getOrdersByUserId(Cookie.get("id_user")).then(response => { setOrders(response) })
    }


  }

  if (!(Cookie.get("id_user") > -1) && isLogged) {
    setIsLogged(false)
  }

  const login = (
    <span>
      <a id="logout" onClick={logout}> <span> Welcome in {user.first_name} </span> </a>
    </span>
  )

  const showUserInfo = (
    <div className="userInfo">
      <div> {user.first_name} {user.last_name} </div>
      <div> Username: {user.username} </div>
      <div> Email: {user.email} </div>
      <div> Orders: {orders.length > 0 ? showUserOrders(orders) : <a></a>}</div>
    </div>
  )


  return (
    <div className="home">
 
    </div>
  );
}

export default User;
