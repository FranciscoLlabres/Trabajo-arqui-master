import React, { useContext } from 'react'
import { DataContext } from "../../context/Dataprovider";
import { ProductItem } from "./ProductItem"


export const ListaDeProductos = () => {

    const [productos,setProductos] = useState([]);
    const fetchApi = async()=>{
    const response = await fetch('http://localhost:8090/productRandom/9')
    .then((response) => response.json());
    setProductos(response);
    };
    useEffect(()=>{
    fetchApi();
    },[])

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
