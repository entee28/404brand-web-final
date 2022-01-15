import React from 'react'
import { NavLink } from 'react-router-dom'
import cart from '../res/bag.svg'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className="navbar-brand">
                    <NavLink to='/' className='brand'>
                        404brand.
                    </NavLink>
                </div>

                <ul className="navbar-nav-left">
                    <li>
                        <NavLink to='/'>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>About</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Contact</NavLink>
                    </li>
                </ul>

                <div className="navbar-nav-right">
                    <NavLink to='/'><img src={cart} alt="cart" className='icon' /></NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
