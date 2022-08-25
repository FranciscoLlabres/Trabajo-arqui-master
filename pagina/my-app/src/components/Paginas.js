import React from 'react'
import { Switch, Route} from 'react-router-dom'
import { Inicio } from './Inicio'
import { ListaDeProductos } from './Products/index' 


export const Paginas = () =>{
    return(
    <section>
        <Switch>
         <Route path="/" exact component = {Inicio} />
         <Route path="/productos" exact component = {ListaDeProductos} />
        </Switch>
    </section>
        
         
    )
}