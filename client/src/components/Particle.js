import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'

const Particle = (props) => {
    const ref = useRef();
    useFrame((state, delta) => (ref.current.rotation.y += .005))

    return (
        <points
            {...props}
            ref={ref}
            scale={2} >
            <torusGeometry args={[.7, .2, 16, 100]} />
            <pointsMaterial size={0.005} />
        </points>

    );
};

export default Particle;
