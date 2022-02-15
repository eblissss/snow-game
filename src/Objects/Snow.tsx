import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const NUM_PART = 50;

const geo = new THREE.PlaneGeometry(1, 1, NUM_PART, NUM_PART);
const geoArr = geo.attributes.position.array;
const verts = Float32Array.from(geoArr);
geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));

for (let i = 0; i < NUM_PART * NUM_PART; i++) {
    verts[i] = 10 - Math.random() * 20;
    verts[i + 1] = 10 - Math.random() * 20;
    verts[i + 2] = 10 - Math.random() * 20;
}

function Snow(props: JSX.IntrinsicElements["mesh"]) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        ref.current.rotation.z -= 0.004;
        ref.current.rotation.y += 0.002;
    });

    return (
        <points ref={ref} position={[4, 7, 5]}>
            <primitive attach="geometry" object={geo} />
            <pointsMaterial
                attach="material"
                color="white"
                size={3}
                sizeAttenuation={false}
            />
        </points>
    );
}

export default Snow;
