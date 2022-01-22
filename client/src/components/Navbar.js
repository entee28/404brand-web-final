import React from 'react'
import { NavLink } from 'react-router-dom'
import cartt from '../res/bag.svg'
import person from '../res/person-fill.svg'
import boxarrowleft from '../res/box-arrow-left.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/authActions'

const Navbar = ({ click }) => {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => cartItems.length;

    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

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
                        {isAuthenticated ?
                            (
                                <button className='btn-default' onClick={handleLogout}>
                                    <NavLink to='/'>
                                        <img src={boxarrowleft} alt="cart" className='icon' />
                                    </NavLink>
                                </button>
                            ) :
                            (
                                <NavLink to='/login'>
                                    <img src={person} alt="cart" className='icon' />
                                </NavLink>
                            )}
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
