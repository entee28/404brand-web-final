import React from 'react'
import { NavLink } from 'react-router-dom'
import product8 from '../res/product8.jpg'
import trash from '../res/trash.svg'

const CartItem = () => {
    return (
        <div className='cartitem'>
            <div className="cartitem_image">
                <img src={product8} alt="product8" />
            </div>

            <NavLink to={`/product/${111}`} className="cartitem_name">
                <p>Product 1</p>
            </NavLink>

            <p className='cartitem_price'>$29.95</p>

            <select name="" id="" className='cartitem_select'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <button className="cartitem_deleteBtn">
                <img src={trash} alt="trash" className='icon' />
            </button>
        </div>
    )
}

export default CartItem
