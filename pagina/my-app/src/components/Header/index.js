import React from 'react'
import Nike from '../../images/Nike.jpg';
import {Link} from "react-router-dom";



export const Header = () => {
    return(
    <header>
        <Link to="/#">
            <div className="logo">
                <img src={Nike} alt="logo" width="140px"/>
            </div>
        </Link>
        <ul>
            <li>
                <Link to = '/'>INICIO</Link>
            </li>
            <li>
                <Link to = '/products'>PRODUCTOS</Link>
            </li>
            <div className="cart">
                <box-icon name="cart"></box-icon>
                <span className='total_cart'></span>
            </div>
        </ul>
    </header>
    )
}