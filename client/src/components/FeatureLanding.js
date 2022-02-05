import { useRef, useEffect } from 'react'
import { gsap, Expo } from 'gsap'
import { Link } from 'react-router-dom';

const FeatureLanding = () => {
    const tl = useRef();
    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        tl.current = gsap.timeline({
            defaults: {
                ease: Expo.easeOut
            }
        })
            .from(q('.bg'), {
                scale: 0.6,
                duration: 2,
                opacity: 0,
                delay: 0.2
            })
            .to(q('.text-reveal'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                y: 0,
                stagger: .5,
                duration: 1,
            }, "-=2.9")
            .to(q('.text-reveal'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                y: -200,
                duration: .2,
                delay: 1
            })
            .to(q('.text-reveal'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                stagger: .5,
                duration: .3,
                delay: .5
            })
            .to(q('svg'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                y: -150,
                delay: .5
            })
            .to(q('.btn'), {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                y: -150,
            }, '-=1.4')
    }, [])

    return (
        <section ref={el}>
            <div className='bg'></div>
            <div class="feature-container">
                <div class="content">
                    <div class="content-inner">
                        <p className='text-reveal feature-brand'>404brand.</p>
                        <p class="text-reveal">SKINS | GLASS | PHONE CASES | CULTURE</p>
                        <h1 class="text-reveal">Accessories Essentials</h1>
                    </div>

                    <svg viewBox="0 0 24 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9393 121.061C11.5251 121.646 12.4749 121.646 13.0607 121.061L22.6066 111.515C23.1924 110.929 23.1924 109.979 22.6066 109.393C22.0208 108.808 21.0711 108.808 20.4853 109.393L12 117.879L3.51471 109.393C2.92893 108.808 1.97918 108.808 1.39339 109.393C0.807607 109.979 0.807607 110.929 1.39339 111.515L10.9393 121.061ZM10.5 -6.55671e-08L10.5 120L13.5 120L13.5 6.55671e-08L10.5 -6.55671e-08Z" fill="white" />
                    </svg>

                    <Link to={`/shop`}><button className='btn btn-feature'>Shop Now</button></Link>
                </div>
            </div>
        </section>
        // <div className='feature-container'>
        //     <p className='feature-brand'>404brand.</p>
        //     <div className="feature">
        //         <p>SKINS | GLASS | PHONE CASES | CULTURE</p>
        //         <h2>Accessories</h2>
        //         <h2>Essential</h2>
        //         <button className='btn btn-feature'>Shop Now</button>
        //     </div>
        // </div>

    )
}

export default FeatureLanding
