import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decCart, incCart, removeFromCart } from '../actions/cartActions'
import CartItem from './CartItem'
import Navbar from './Navbar'
import StripeCheckout from 'react-stripe-checkout'
import { useState } from 'react'

const Cart = () => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qtyChangeHandler = (id, qty, type) => {
        if (type === 'dec') {
            dispatch(decCart(id, qty));
        } else {
            dispatch(incCart(id, qty));
        }
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const getCartCount = () => cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);

    const getCartSubTotal = () => cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)

    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
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
                            <CartItem key={item.product} item={item} qtyChangeHandler={qtyChangeHandler} removeFromCartHandler={removeFromCartHandler} />
                        )
                    )}
                </div>
                <div className="cartscreen-right">
                    <div className="cartscreen-info">
                        <p>Subtotal {getCartCount()} items</p>
                        <p>${getCartSubTotal().toFixed(2)}</p>
                    </div>
                    <div>
                        <StripeCheckout name='404brand.'
                            image='data:image/jpeg;base64,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'
                            billingAddress
                            shippingAddress
                            description={`Your total is $${getCartSubTotal().toFixed(2)}`}
                            token={onToken}
                            stripeKey={process.env.REACT_APP_STRIPE}>
                            <button className='btn btn-feature'>Proceed To Checkout</button>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
