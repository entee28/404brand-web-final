import { Canvas } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import Particle from './Particle';
import useWindowDimensions from '../hook/useWindowDimensions';
import SmallParticle from './SmallParticle';
import times from '../res/times-solid.svg'
import { gsap, Back } from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { Link } from 'react-router-dom';
import hamburger from '../res/bars-solid.svg'

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
        <div className='about' ref={el}>
            <img src={hamburger} alt="nav button" className='hamburger-about icon' onClick={() => tl.current.play()} />
            <div className='overlay'>
                <a href="#" className='exit' onClick={() => tl.current.reverse(.7)}><img src={times} alt="close" className='icon' /></a>

                <div className="mobile-menu">
                    <div className="menu-container">
                        <ul>
                            <li>
                                <Link to='/shop'>Shop</Link>
                            </li>
                            <li>
                                <Link to='/about'>About</Link>
                            </li>
                            <li>
                                <Link to='/contact'>Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='particle-content-container'>
                <div className='fancy-line'></div>
                <div className="particle-content">
                    <h1 id='particle-h1'>The One And <br /> Only</h1>
                    <p id='particle-p'>Make scratches and fingerprints things of the past. <br /> In the future, there's only 404brand - your next dimension.</p>
                </div>
            </div>

            <div className='particle-container' >
                <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
                    <pointLight position={[2, 3, 4]} />
                    <perspectiveCamera position={[0, 0, 2]} fov={75} aspect={width / height} near={0.1} far={100} updateProjectionMatrix />
                    <color attach='background' args={['#21282a']} />
                    <Particle />
                    <SmallParticle />
                </Canvas>
            </div>
        </div>
    );
};

export default About;
