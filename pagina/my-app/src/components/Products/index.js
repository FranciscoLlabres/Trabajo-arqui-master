import React, { useContext } from 'react'
import { DataContext } from "../../context/Dataprovider";
import { ProductItem } from "./ProductItem"


export const ListaDeProductos = () => {

    const value = useContext(DataContext)
    const [products] = value.productos

    console.log(products)

    return (
        <>
            <h1 className='title'>PRODUCTOS</h1>
            <div className='products'>
                <div className='product'>
                    {
                        products.map(product => (
                            <ProductItem
                                key={producto.id}
                                id={producto.id}
                                name={producto.name}
                                base_price={producto.base_price}
                                id_category={producto.id_category}
                                stock={producto.stock}
                                picture_url={producto.picture_url}
                                description={producto.description}
                            />

                            
                        ))
                    }
                </div>
            </div>
        </>
    )
}
