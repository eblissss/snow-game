import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface CoinProps {
    updateScore: () => void;
    position: [x: number, y: number, z: number];
    key: number;
}

function Coin(props: CoinProps) {
    const coin = useRef<THREE.Mesh>(null!);
    const hit = useRef<THREE.Mesh>(null!);

    const [used, setUsed] = useState(false);

    useFrame((state, delta) => {
        coin.current.position.z -= delta * 10;
        hit.current.position.z -= delta * 10;

        if (!used) {
            coin.current.rotation.z += 0.01;
        } else {
            coin.current.rotation.z += 0.2;
            coin.current.position.y += 0.05;
        }
    });

    const pointerOver = (used: boolean): void => {
        if (!used) {
            props.updateScore();
            setUsed(true);
        }
    };

    return (
        <>
            <mesh
                position={props.position}
                key={props.key + 1}
                ref={hit}
                rotation={[1.2, 0, 0]}
                onPointerOver={(e) => pointerOver(used)}
            >
                <boxGeometry args={[1.6, 0.8, 1.6]} />
                <meshStandardMaterial visible={false} />
            </mesh>
            <mesh
                position={props.position}
                key={props.key}
                ref={coin}
                rotation={[1.2, 0, 0]}
            >
                <cylinderGeometry args={[0.6, 0.6, 0.2, 12]} />
                <meshStandardMaterial color={used ? "#CFB53B" : "#FFDF00"} />
            </mesh>
        </>
    );
}

export default Coin;
