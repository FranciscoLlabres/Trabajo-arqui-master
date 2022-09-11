import React, {useEffect} from "React";
import Cookies from "universal-cookie"

const Cookie = new Cookies();

async function getUserById(id){
    return await fetch('http://localhost:8090/user/' + id, {
    method : 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
}).then(response => response.json())

}

async function getCategories(){
return await fetch('http://localhost:8090/categories',{
    method : 'GET',
    headers : {
        'Content-Type': 'application/json' 
    }
}).then(response => response.json())

}

async function getProducts(){
    return await fetch('http://localhost:8090/products',{
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'  
        }
    }).then(response => response.json())
}
