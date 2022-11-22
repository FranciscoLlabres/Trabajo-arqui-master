import React, { useState } from "react";
import Cookies from "universal-cookie";
import swal from "sweetalert2";

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

function retry() {
  goto("/")
}

function logout() {
  Cookie.set("user_id", -1, { path: "/" })
  document.location.reload()
}

/*
function productsByCategoryId(id, setter, categorySetter) {
  getProductsByCategoryId(id).then(response => { setter(response); Cookie.set("category", id); getCategoryById(id).then(category => categorySetter(category)) })
}

function showCategories(categories, setter, categorySetter) {
  return categories.map((category, i) => <a onClick={() => productsByCategoryId(category.category_id, setter, categorySetter)} obj={category} key={category.category_id}>{category.name}</a>)
}*/

export const ProductosBuscador = ()=>{

  const [productos,setProductos] = useState([]);
  const [busqueda, setBusqueda]= useState("");
  const fetchApi = async()=>{
    
      const response = await fetch('http://localhost:8090/productText/'+busqueda)
      .then((response) => response.json());
      if (response.status == 400) {
        swal.fire({
          icon: 'error',
          text: "No se encontro el producto",
        }).then((result) => {
          if (result.isConfirmed) {
              window.location.reload();
          }})
     }else{
      
      setProductos(response)
      console.log(response);
     }
      };

  const handleChange=e=>{
   setBusqueda(e.target.value);
   
 
    };

    const handleSubmit= (event)=>{
      event.preventDefault();
      
    
      fetchApi();

  };
  
  return(
      <>
      <h1 className="title"> PRODUCTOS</h1>
      <div className="containerInput" >
      <input
         
        className="form-control inputBuscar"
        value={busqueda}
        placeholder="Buscador de Productos"
        onChange={handleChange}
       
      />
      <input 
      value = "Buscar"
       type = "button"
      onClick = {handleSubmit}
      />
    </div>
      <div className="productos">
          {
              productos.map(producto =>(
                <ProductoItem key={producto.id_product}
                id={producto.id_product}
                name={producto.name}
                base_price={producto.price}
                id_category={producto.id_category}
                stock={producto.stock}
                picture_url={producto.picture_url}
                description={producto.description}
                /> 
              ))
          }
      </div> 
      </>
  )
}


function ProductsView(products, setCartItems) {
  return products.map((product) =>

    <div obj={product} key={product.id_product} className="product">
      <div onClick={() => goto("/product?id=" + product.id_product)}>
        <img width="128px" height="128px" src={"./images/" + product.picture_url} onError={(e) => (e.target.onerror = null, e.target.src = "./images/default.jpg")} />
      </div>
      <a className="name">{product.name}</a>
      <a className="addcart" onClick={() => addToCart(product.id_product, setCartItems)}>Add to Cart</a>
      <a className="price">{"$" + product.price}</a>
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


  if (Cookie.get("id_user") > -1 && !isLogged) {
    getUserById(Cookie.get("id_user")).then(response => setUser(response))
    setIsLogged(true)
  }

  if (!(Cookie.get("id_user") > -1) && isLogged) {
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


  /*if (!cartItems && Cookie.get("cartItems")) {
    setCartItems(Cookie.get("cartItems"))
  }*/
}

export default Home;

 



