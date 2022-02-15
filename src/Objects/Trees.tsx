import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import Tree from "./Meshes/Tree";

let t = 0;
let id = 0;

interface TreesProps {
    updateScore: () => void;
}

function Trees(props: TreesProps): JSX.Element {
    const [trees, setTrees] = useState([<></>]);

    useFrame((state, delta) => {
        const newTrees: JSX.Element[] = [...trees];
        t += delta;
        if (t > Math.random() * 2 + 0.6) {
            t = 0;
            id += 2;
            const xPos = Math.random() * 14 - 7;
            newTrees.push(
                <Tree
                    position={[xPos, 1, 13]}
                    key={id}
                    updateScore={props.updateScore}
                />
            );
        }
        if (newTrees.length > 6) {
            newTrees.shift();
        }

        setTrees([...newTrees]);
    });

    return <>{trees}</>;
}

export default Trees;
