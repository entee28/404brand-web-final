import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Navbar'
import plus from '../res/plus.svg'
import dash from '../res/dash.svg'

// Actions
import { getProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

const Product = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { product } = productDetails;

    useEffect(() => {
        if (product && match.params.id !== product._id) {
            dispatch(getProductDetails(match.params.id))
        }
    }, [dispatch, product, match])

    const handleQuantity = (type) => {
        if (type === 'dec') {
            qty > 1 && setQty(qty - 1);
        } else {
            qty < product.countInStock && setQty(qty + 1);
        }
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty));
        history.push('/cart');
    }

    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <div className="img-container">
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="info-container">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p className='price'>${product.price}</p>

                    <div className='add-container'>
                        <div className="amount-container">
                            <button onClick={() => handleQuantity('dec')} className='plus-dash'><img src={dash} alt="dash" /></button>
                            <span className="amount">{qty}</span>
                            <button onClick={() => handleQuantity('inc')} className='plus-dash'><img src={plus} alt="plus" /></button>
                        </div>
                    </div>
                    {product.countInStock > 0 ?
                        (<button className='btn btn-feature' onClick={addToCartHandler}>Add To Cart</button>) :
                        (<button className='btn btn-disabled'>Out Of Stock</button>)
                    }

                </div>
            </div>
        </div>
    )
}

export default Product
