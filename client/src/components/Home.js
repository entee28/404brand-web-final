import { useEffect, useRef, useState } from 'react'
import FeatureLanding from './FeatureLanding'
import Navbar from './Navbar'
import product1 from '../res/product1.jpg'
import product2 from '../res/product2.jpg'
import product3 from '../res/product3.jpg'
import product4 from '../res/product4.jpg'
import Footer from './Footer'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom'

const Home = () => {
    gsap.registerPlugin(ScrollTrigger);

    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: q('.feature-panel'),
            start: 'top top',
            pin: true,
            pinSpacing: false
        })

        ScrollTrigger.create({
            trigger: q('.home-panel'),
            start: 'top top',
            end: '+=0.1',
            pin: true,
            pinSpacing: false
        })
    }, [])

    return (
        <div ref={el}>
            <div className="feature-panel">
                <FeatureLanding />
            </div>
            <div className="home-panel">
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
                            <Link to='/product/61e3d2886d025374a76149cf'>
                                <button className='btn'>Prove Us Right</button>
                            </Link>
                        </div>
                        <div className="box product6">
                            <p>It's either this or a screen replacement.</p>
                            <h3>Glass</h3>
                            <Link to='/product/61e3d1726d025374a76149ca'>
                                <button className='btn'>Save A Screen</button>
                            </Link>
                        </div>
                    </div>
                    <div className="highlight-container reversed">
                        <div className="box product7">
                            <p>Goodbye dental floss.</p>
                            <h3>AIRPODS</h3>
                            <Link to='/product/61e3d5bf6d025374a76149da'>
                                <button className='btn'>Hello Grip Case</button>
                            </Link>
                        </div>
                        <div className="box product8">
                            <p>It's like the apocalypse, but on your phone.</p>
                            <h3>ROBOT CAMO</h3>
                            <Link to='/product/61e3d1726d025374a76149ca'>
                                <button className='btn'>Visit The Future</button>
                            </Link>
                        </div>
                    </div>
                    <div className="highlight-container">
                        <div className="box product9">
                            <p>Because vaccines won't make you less ugly.</p>
                            <h3>MASKS</h3>
                            <Link to='/product/61e3d8c56d025374a76149dd'>
                                <button className='btn'>Hide Your Face</button>
                            </Link>
                        </div>
                        <div className="box product10">
                            <p>Losing your shit has never been more expensive.</p>
                            <h3>AIRTAG</h3>
                            <Link to='/product/61e3d1cb6d025374a76149cd'>
                                <button className='btn'>Buy Four</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Home
