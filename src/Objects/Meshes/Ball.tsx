import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function Ball(props: JSX.IntrinsicElements["mesh"]) {
    const ref = useRef<THREE.Mesh>(null!);

    const [hovered, hover] = useState(false);

    useFrame((state, delta) => (ref.current.rotation.x += 0.01));

    return (
        <mesh
            {...props}
            ref={ref}
            scale={2}
            onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)}
        >
            <dodecahedronGeometry args={[1]} />
            <meshStandardMaterial color={hovered ? "lightgray" : "white"} />
        </mesh>
    );
}

export default Ball;
