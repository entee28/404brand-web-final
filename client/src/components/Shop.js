import { useEffect } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { getProducts } from '../actions/productActions'
import PropTypes from 'prop-types'

const Shop = (props) => {
    useEffect(() => {
        props.getProducts()
    }, [])

    const { products } = props.product;

    return (
        <div>
            <Navbar />
            <div className="shop">
                <div className="shop-grid">
                    {products.map((products) => (
                        <div className='product'>
                            <img src={products.imageUrl} alt={products.name} />
                            <h2>{products.name}</h2>
                            <p>${products.price}</p>
                        </div>
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
