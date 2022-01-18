import { useEffect } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { getProducts } from '../actions/productActions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Shop = (props) => {
    useEffect(() => {
        props.getProducts()
    })

    const { products } = props.product;

    return (
        <div>
            <Navbar />
            <div className="shop">
                <div className="shop-grid">
                    {products.map((products) => (
                        <Link to={`/product/${products._id}`} key={products._id}>
                            <div className='product'>
                                <img src={products.imageUrl} alt={products.name} />
                                <h2>{products.name}</h2>
                                <p>${products.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

Shop.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(Shop)
