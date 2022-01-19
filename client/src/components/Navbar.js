import React from 'react'
import { NavLink } from 'react-router-dom'
import cartt from '../res/bag.svg'
import person from '../res/person-fill.svg'
import { useSelector } from 'react-redux'

const Navbar = ({ click }) => {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => cartItems.length;

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
                        <NavLink to='/shop' activeClassName='selected-nav'>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>About</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' activeClassName='selected-nav'>Contact</NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav-right">
                    <li>
                        <NavLink to='/login'>
                            <img src={person} alt="cart" className='icon' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/cart'>
                            <img src={cartt} alt="cart" className='icon' />
                            <span className='cart-badge'>{getCartCount()}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
