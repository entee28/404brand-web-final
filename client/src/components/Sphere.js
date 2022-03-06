import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three';

const Sphere = (props) => {
    const normalTexture = useLoader(TextureLoader, 'NormalMap.png');
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.rotation.y += .005
    }
    );


    return (
        <mesh
            {...props}
            ref={ref}
            scale={2} >
            <sphereBufferGeometry args={[.5, 64, 64]} />
            <meshStandardMaterial metalness={0.7} roughness={0.2} color={0x292929} normalMap={normalTexture} />
        </mesh>

    );
};

export default Sphere;
