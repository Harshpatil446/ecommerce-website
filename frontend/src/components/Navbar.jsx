import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to="/">
                    <img src="D:\Programming\PROJECTS\ecommerce\frontend\public\Yellow E-commerce Shop Bag Store Logo.png" alt="E-store" className='navbar-logo' />
                    E-store
                </Link>
            </div>
            <ul className='navbar-links'>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
