import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'

const SmallParticle = (props) => {
    const ref = useRef();
    const [mouseY, setMouseY] = useState(0);
    const [mouseX, setMouseX] = useState(0);

    useFrame((state, delta) => {
        ref.current.rotation.y += 0.0001;

        if (mouseX > 0) {
            ref.current.rotation.x += -mouseY * 0.000018;
            ref.current.rotation.y += mouseX * 0.000018;
        }

    })

    const particleCnt = 5000;
    const posArray = new Float32Array(particleCnt * 3);

    for (let i = 0; i < particleCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 10);
    }

    return (
        <points
            {...props}
            ref={ref}
            onPointerMove={(e) => {
                setMouseY(e.clientY);
                setMouseX(e.clientX);
            }}
            scale={2} >
            <bufferGeometry>
                <bufferAttribute attachObject={['attributes', 'position']} count={posArray.length / 3} array={posArray} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.005} />
        </points>
    );
};

export default SmallParticle;
