import React from 'react'
import IMG from "../../images/img01.jpg"


export const ProductItem = () => {
    return (
        <div>
            <div className='product'>
                <a href='/#'>
                    <div className='product_img'>
                        <img src={IMG} alt="" />
                    </div>
                </a>
                <div className='product_footer'>
                    <h1>Nike</h1>
                    <p>Zapatillas</p>
                    <p className='price'>$1459</p>
                </div>
                <div className='button'>
                    <button className='buy'>
                        Comprar
                    </button>
                </div>
            </div>
        </div>

    )

}