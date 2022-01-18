import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { decCart, incCart, removeFromCart } from '../actions/cartActions'
import CartItem from './CartItem'
import Navbar from './Navbar'

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
                        <button className='btn btn-feature'>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
