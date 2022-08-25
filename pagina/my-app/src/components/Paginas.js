import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Inicio } from './Inicio'
import { ListaDeProductos } from './Products/index' 


export const Paginas = () =>{
    return(
  <section>

<Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/products" element={<ListaDeProductos />} />
</Routes>


  </section>
   
        
         
    )
}