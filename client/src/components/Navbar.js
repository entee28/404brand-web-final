import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cartt from '../res/bag.svg'
import person from '../res/person-fill.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import times from '../res/times-solid.svg'
import { gsap, Back } from 'gsap'
import signin from '../res/sign-in.svg'
import hamburger from '../res/bars-solid.svg'

const Navbar = (props) => {
    const tl = useRef();
    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        tl.current = gsap.timeline({
            defaults: {
                ease: Back.easeOut.config(2),
                duration: 1
            }
        })
            .paused(true)
            .to(q('.overlay'), {
                clipPath: 'circle(100%)'
            })
            .to(q('.menu-container'), {
                opacity: 1,
                y: '30px',
                stagger: 0.1
            }, '-=1')
    }, []);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => cartItems.length;

    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        setOpen(!isOpen);
    }

    const handleAuthClick = () => {
        dispatch(clearErrors());
    }

    const [isOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!isOpen);
    }

    return (
        <nav className={props.nav_abs + ' navbar'} ref={el}>
            <div className='navbar-container'>
                <div className="navbar-brand">
                    <NavLink to='/' className='brand'>
                        404brand.
                    </NavLink>
                </div>

                <ul className="navbar-nav-left">
                    <li className='nav-item'>
                        <NavLink to='/shop' activeClassName='selected-nav'>Shop</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/about' activeClassName='selected-nav'>About</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/contact' activeClassName='selected-nav'>Contact</NavLink>
                    </li>
                    <img src={hamburger} alt="nav button" className='hamburger icon' onClick={() => tl.current.play()} />

                </ul>

                <ul className="navbar-nav-right">
                    <li className='toast-trigger'>
                        {isAuthenticated ?
                            (
                                <button className='btn-default toast-trigger' onClick={toggle}>
                                    <img src={person} alt="cart" className='icon' />
                                </button>

                            ) :
                            (
                                <button className='btn-default' >
                                    <NavLink to='/login' onClick={handleAuthClick}>
                                        <img src={signin} alt="cart" className='icon' />
                                    </NavLink>
                                </button>
                            )}
                        {isOpen ? (
                            <div className='toast'>
                                {user ? <span>Hello, <strong>{user.firstname}</strong> </span> : null}
                                <ul>
                                    {user.isAdmin ? <li><NavLink to='/admin'>Admin</NavLink></li> : null}
                                    <li>
                                        <NavLink to='/changepassword'>Change Password</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' onClick={handleLogout}>Logout</NavLink>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </li>
                    <li>
                        <NavLink to='/cart'>
                            <img src={cartt} alt="cart" className='icon' />
                            <span className='cart-badge'>{getCartCount()}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className='overlay'>
                <a href="#" className='exit' onClick={() => tl.current.reverse(.7)}><img src={times} alt="close" className='icon' /></a>

                <div className="mobile-menu">
                    <div className="menu-container">
                        <ul>
                            <li>
                                <NavLink to='/shop'>Shop</NavLink>
                            </li>
                            <li>
                                <NavLink to='/about'>About</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact'>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar