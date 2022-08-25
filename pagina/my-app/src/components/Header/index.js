import React from 'react'
import Nike from '../../images/Nike.jpg'



export const Header = () => {
    return(
    <header>
        <a href="/#">
            <div className="logo">
                <img src={Nike} alt="logo" width="140px"/>
            </div>
        </a>
        <ul>
            <li>
                <a href='/#'>INICIO</a>
            </li>
            <li>
                <a href='/#'>PRODUCTOS</a>
            </li>
            <div className="cart">
                <box-icon name="cart"></box-icon>
                <span className='total_cart'></span>
            </div>
        </ul>
    </header>
    )
}