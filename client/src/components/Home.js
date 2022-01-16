import React from 'react'
import FeatureLanding from './FeatureLanding'
import Navbar from './Navbar'
import product1 from '../res/product1.jpg'
import product2 from '../res/product2.jpg'
import product3 from '../res/product3.jpg'
import product4 from '../res/product4.jpg'

const Home = () => {
    return (
        <div>
            <FeatureLanding />
            <Navbar />
            <div className='featured-products'>
                <h3>The Accessories Collection</h3>
                <p>Just give us your money ™</p>
                <button className='btn btn-feature'>Make us rich</button>
                <div className='grid-col-2'>
                    <div className='item'>
                        <img src={product1} alt="product" />
                        <h4>Darkplates</h4>
                    </div>
                    <div className='item'>
                        <img src={product2} alt="product" />
                        <h4>Pastels</h4>
                    </div>
                    <div className='item'>
                        <img src={product3} alt="product" />
                        <h4>Skins</h4>
                    </div>
                    <div className='item'>
                        <img src={product4} alt="product" />
                        <h4>Teardown</h4>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className='product-highlight'>
                <div className="highlight-container">
                    <div className="box product5">
                        <p>We know you can afford this.</p>
                        <h3>FOLD & FLIP</h3>
                        <button className='btn'>Prove Us Right</button>
                    </div>
                    <div className="box product6">
                        <p>It's either this or a screen replacement.</p>
                        <h3>Glass</h3>
                        <button className='btn'>Save A Screen</button>
                    </div>
                </div>
                <div className="highlight-container reversed">
                    <div className="box product7">
                        <p>Goodbye dental floss.</p>
                        <h3>AIRPODS</h3>
                        <button className='btn'>Hello Grip Case</button>
                    </div>
                    <div className="box product8">
                        <p>It's like the apocalypse, but on your phone.</p>
                        <h3>ROBOT CAMO</h3>
                        <button className='btn'>Visit The Future</button>
                    </div>
                </div>
                <div className="highlight-container">
                    <div className="box product9">
                        <p>Because vaccines won't make you less ugly.</p>
                        <h3>MASKS</h3>
                        <button className='btn'>Hide Your Face</button>
                    </div>
                    <div className="box product10">
                        <p>Losing your shit has never been more expensive.</p>
                        <h3>AIRTAG</h3>
                        <button className='btn'>Buy Four</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
