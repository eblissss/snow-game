import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import SimplexNoise from "simplex-noise";

const simplex = new SimplexNoise();

const arrRes = 20;
const geo = new THREE.PlaneGeometry(1, 1, arrRes, arrRes);
const geoArr = geo.attributes.position.array;
const vertices = Float32Array.from(geoArr);
geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

function Ground(props: JSX.IntrinsicElements["mesh"]) {
    const ref = useRef<THREE.Mesh>(null!);

    const [hovered, hover] = useState(false);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        for (let i = 0; i < geoArr.length; i += 3) {
            vertices[i + 2] =
                simplex.noise3D(geoArr[i] * 2, geoArr[i + 1] * 2 - t, 0) / 2;
        }
        //console.log(vertices);

        ref.current.geometry.attributes.position.needsUpdate = true;
        //console.log(state);
    });

    return (
        <>
            <mesh
                {...props}
                position={[0, 0, 0]}
                ref={ref}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[14, 30, 1]}
                onPointerOver={(e) => hover(true)}
                onPointerOut={(e) => hover(false)}
            >
                <primitive attach="geometry" object={geo} />
                <meshStandardMaterial
                    color={hovered ? "#eee" : "#ddd"}
                    roughness={0.5}
                />
            </mesh>
            <mesh
                position={[15, -10, -5]}
                rotation={[-Math.PI / 2, Math.PI / 4, 0]}
                scale={[25, 30, 1]}
            >
                <planeBufferGeometry args={[1, 1]} />
                <meshStandardMaterial color={"#ccc"} side={THREE.FrontSide} />
            </mesh>
            <mesh
                position={[-15, -5, -5]}
                rotation={[-Math.PI / 2, -Math.PI / 8, 0]}
                scale={[20, 40, 1]}
            >
                <planeBufferGeometry args={[1, 1]} />
                <meshStandardMaterial color={"#ccc"} side={THREE.FrontSide} />
            </mesh>
        </>
    );
}

export default Ground;
