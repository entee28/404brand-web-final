import { Canvas } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import Particle from './Particle';
import useWindowDimensions from '../hook/useWindowDimensions';
import SmallParticle from './SmallParticle';
import { gsap, Expo } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Sphere from './Sphere';
import Footer from './Footer'
import Navbar from './Navbar';

const About = () => {
    const section1 = [];
    const section2 = [];
    const section3 = [];
    const sections = [section1, section2, section3];
    const wrapperNames = ['wrapper1', 'wrapper2', 'wrapper3'];

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < 4; i++) {
        section1.push(`https://source.unsplash.com/random/1240x874?sig=${getRandomInt(0, 206)}`);
        section2.push(`https://source.unsplash.com/random/1240x874?sig=${getRandomInt(0, 206)}`);
        section3.push(`https://source.unsplash.com/random/1240x874?sig=${getRandomInt(0, 206)}`);
    }

    const { height, width } = useWindowDimensions();
    gsap.registerPlugin(ScrollTrigger);

    const tl = useRef();
    const el = useRef();
    const q = gsap.utils.selector(el);

    const w0 = useRef();
    const w1 = useRef();
    const w2 = useRef();
    const w3 = useRef();
    const w4 = useRef();
    const wrapperRef = [w0, w1, w2, w3, w4];

    useEffect(() => {
        tl.current = gsap.timeline()
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

        gsap.from(q('.mission-img'), {
            scale: 0.6,
            duration: 4,
            opacity: 0,
            ease: Expo.easeOut,
            scrollTrigger: {
                trigger: q('.mission-img'),
                scrub: 1,
            }
        })

        gsap.from(q('.mission-content'), {
            scale: 0.6,
            duration: 4,
            opacity: 0,
            ease: Expo.easeOut,
            scrollTrigger: {
                trigger: q('.mission-content'),
                scrub: 1,
            }
        })

        // let panels = gsap.utils.toArray(q('.panel'));
        // panels.forEach((panel, i) => {
        //     ScrollTrigger.create({
        //         trigger: panel,
        //         start: 'top top',
        //         pin: true,
        //         pinSpacing: false
        //     })
        // });

        ScrollTrigger.create({
            trigger: q('.particle-container'),
            start: 'top top',
            pin: true,
            pinSpacing: false
        })

        ScrollTrigger.create({
            trigger: q('.mission-container'),
            start: 'top top',
            end: '+=0.1',
            pin: true,
            pinSpacing: false
        })

        gsap.utils.toArray(q('section')).forEach((section, index) => {
            const w = wrapperRef[index];
            const [x, xEnd] = (index % 2) ? ['100%', (w.current.scrollWidth - section.offsetWidth) * -1] : [w.current.scrollWidth * -1, 0];
            console.log(w.current.scrollWidth, section.offsetWidth);
            gsap.fromTo(q(`.wrapper${index}`), { x }, {
                x: xEnd,
                scrollTrigger: {
                    trigger: section,
                    scrub: 0.5
                }
            });
        });
    }, []);

    return (
        <>
            <Navbar nav_abs='nav-abs' />
            <div className='about' ref={el}>

                <div className='particle-container panel' >
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

                <div className='mission-container panel'>
                    <div className='mission-img'></div>
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p className='pre-para'>404brand is the global leader in device customization. Founded on 11.11.11. Run by robots.</p>
                        <p>We’re giving you two screen protectors with each order. That’s it. That’s the paragraph.</p>
                    </div>
                </div>

                <div className="gallery-container">
                    <div className="demo-wrapper">
                        {/* <header className="df aic jcc">
                            <div>
                                <h1>ScrollTrigger</h1>
                                <h2>demo</h2>
                            </div>
                        </header> */}
                        <section className="demo-text">
                            <div className="wrapper0 wrapper text" ref={w0}>
                                404404404404404404404404404
                            </div>
                        </section>
                        {sections.map((value, index) => {
                            return (
                                <section className="demo-gallery" id={value}>
                                    <ul className={wrapperNames[index] + ' wrapper'} ref={wrapperRef[index + 1]}>
                                        {value.map((value, index) => {
                                            return (
                                                <li className="item" key={index}>
                                                    <img height="874" width="1240" src={value} alt="img" />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </section>
                            )
                        })}
                        <section className="demo-text">
                            <div className="wrapper4 wrapper text" ref={w4}>
                                404404404404404404404404404
                            </div>
                        </section>
                    </div>
                </div>

                {/* <div className="sphere-container panel">
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
                </div> */}

                <div className="panel footer-panel">
                    <Footer />
                </div>
            </div>
        </>

    );
};

export default About;
