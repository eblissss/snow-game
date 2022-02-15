import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface TreeProps {
    updateScore: () => void;
    position: [x: number, y: number, z: number];
    key: number;
}

function Tree(props: TreeProps) {
    const tree = useRef<THREE.Mesh>(null!);

    const [touched, setTouched] = useState(false);

    useFrame((state, delta) => {
        tree.current.position.z -= delta * 10;

        if (touched) {
            tree.current.rotation.z += Math.random() / 4;
            tree.current.position.y += Math.random() / 3;
        }
    });

    const pointerOver = (used: boolean): void => {
        if (!used) {
            props.updateScore();
            setTouched(true);
        }
    };

    return (
        <group ref={tree} position={props.position} key={props.key}>
            <mesh
                position={[0, -1, 0.4]}
                onPointerOver={(e) => pointerOver(touched)}
            >
                <boxGeometry args={[1.4, 1, 1.5]} />
                <meshStandardMaterial visible={false} />
            </mesh>
            <mesh rotation={[-0.6, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 4, 12]} />
                <meshStandardMaterial color={touched ? "#444" : "#594833"} />
            </mesh>
            <mesh position={[0, 3, -1.8]} rotation={[-0.6, 0, 0]}>
                <coneGeometry args={[1.5, 4, 14]} />
                <meshStandardMaterial color={touched ? "#594833" : "#234F1E"} />
            </mesh>
            <mesh position={[0, 4, -2.5]} rotation={[-0.6, 0, 0]}>
                <coneGeometry args={[1.2, 3, 14]} />
                <meshStandardMaterial color={touched ? "#594833" : "#234F1E"} />
            </mesh>
        </group>
    );
}

export default Tree;
