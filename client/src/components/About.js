import { Canvas } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import Particle from './Particle';
import useWindowDimensions from '../hook/useWindowDimensions';
import SmallParticle from './SmallParticle';
import times from '../res/times-solid.svg'
import { gsap, Back } from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { Link } from 'react-router-dom';
import NavbarDark from './NavbarDark';
import Footer from './Footer';
import camo from '../res/camo.png'
import Sphere from './Sphere';

const About = () => {
    const { height, width } = useWindowDimensions();
    gsap.registerPlugin(CSSRulePlugin);

    const tl = useRef();
    const tl2 = useRef();
    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        tl.current = gsap.timeline({
            defaults: {
                ease: Back.easeOut.config(2),
                duration: 1
            }
        })
            .paused(true)
            .to(q('.overlay'), {
                clipPath: 'circle(100%)',
            })
            .to(q('.menu-container'), {
                opacity: 1,
                y: '30px',
                stagger: 0.1
            }, '-=1')

        tl2.current = gsap.timeline()
            .from(q('.fancy-line'), {
                delay: .5,
                duration: 4,
                width: "0%"
            })
            .to(q('#particle-h1'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                y: '30px',
                duration: 2
            }, '-=3')
            .to(q('#particle-p'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                y: '30px',
                duration: 4
            }, '-=2')

    }, []);

    return (
        <>
            <NavbarDark />
            <div className='about' ref={el}>

                <div className='particle-container' >
                    <div className='particle-content-container'>
                        <div className='fancy-line'></div>
                        <div className="particle-content">
                            <h1 id='particle-h1'>The One And <br /> Only</h1>
                            <p id='particle-p'>Make scratches and fingerprints things of the past. <br /> In the future, there's only 404brand - your next dimension.</p>
                        </div>
                    </div>
                    <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
                        <pointLight position={[2, 3, 4]} />
                        <perspectiveCamera position={[0, 0, 2]} fov={75} aspect={width / height} near={0.1} far={100} updateProjectionMatrix />
                        <color attach='background' args={['#21282a']} />
                        <Particle />
                        <SmallParticle />
                    </Canvas>
                </div>

                <div className='mission-container' >
                    <div className='mission-img'></div>
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p className='pre-para'>404brand is the global leader in device customization. Founded on 11.11.11. Run by robots.</p>
                        <p>We’re giving you two screen protectors with each order. That’s it. That’s the paragraph.</p>
                    </div>
                </div>

                <div className="sphere-container">
                    <div className='sphere-content'>
                        <h1>Make Us Rich</h1>
                        <Link to='/shop' className='btn btn-feature' type='button'>Give Us Some Money</Link>
                    </div>

                    <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
                        <pointLight position={[2, 3, 4]} color={0xffffff} intensity={0.1} />
                        <pointLight position={[-1.86, 1, -1.65]} color={0xff0000} intensity={10} />
                        <pointLight position={[2.13, -3, -1.98]} color={0xe1ff} intensity={6.8} />
                        <perspectiveCamera position={[0, 0, 2]} fov={75} aspect={width / height} near={0.1} far={100} updateProjectionMatrix />
                        <color attach='background' args={['#21282a']} />
                        <Suspense fallback={null}>
                            <Sphere />
                        </Suspense>
                    </Canvas>
                </div>

                <div className='about-footer-container'>
                    <Footer />
                </div>
            </div>
        </>

    );
};

export default About;
