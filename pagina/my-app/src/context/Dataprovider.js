import React, { useState, useEffect, createContext } from 'react'
import Data from '../Data.js';
export const DataContext = createContext();


export const DataProvider = (props) => {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const product = Data.items
        if (product) {
            setProductos(product)
        }else{
            setProductos([])
        }
        
    }, [])

    const value = {
        productos: [productos]
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}