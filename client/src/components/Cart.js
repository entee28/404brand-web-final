import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import CartItem from './CartItem'
import Navbar from './Navbar'

const Cart = () => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    }

    return (
        <div>
            <Navbar />
            <div className='cartscreen'>
                <div className="cartscreen-left">
                    <h2>Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty <Link to='/'>Go Back</Link></p>
                    ) : (
                        cartItems.map(item =>
                            <CartItem item={item} qtyChangeHandler={qtyChangeHandler} />
                        )
                    )}
                </div>
                <div className="cartscreen-right">
                    <div className="cartscreen-info">
                        <p>Subtotal (0) items</p>
                        <p>$29.95</p>
                    </div>
                    <div>
                        <button className='btn btn-feature'>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
