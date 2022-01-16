import React from 'react'
import CartItem from './CartItem'
import Navbar from './Navbar'

const Cart = () => {
    return (
        <div>
            <Navbar />
            <div className='cartscreen'>
                <div className="cartscreen-left">
                    <h2>Cart</h2>

                    <CartItem />
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
