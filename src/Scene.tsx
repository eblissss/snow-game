import React, { useState } from "react";
import Info from "./Objects/Info";
import Ground from "./Objects/Ground";
import Player from "./Objects/Player";
import Coins from "./Objects/Coins";
import Ball from "./Objects/Meshes/Ball";
import Snow from "./Objects/Snow";
import Trees from "./Objects/Trees";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";

let trueScore = 0;

function App() {
    const [score, setScore] = useState(0);

    const updateScore = (): void => {
        trueScore += 1; // dunno why but works lol
        setScore(trueScore);
    };

    const resetScore = (): void => {
        trueScore = 0; // dunno why but works lol
        setScore(trueScore);
    };

    return (
        <div id="bigDiv">
            <Info score={score} />
            <Canvas
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 1000,
                    position: [4, 7, 10],
                    rotation: [-Math.PI / 4, Math.PI / 8, 0],
                }}
            >
                <ambientLight intensity={0.4} />
                <Sky
                    distance={45000}
                    sunPosition={[15, 1, -20]}
                    inclination={0}
                    azimuth={0.2}
                    turbidity={8}
                    rayleigh={0}
                    mieCoefficient={0.01}
                ></Sky>
                <pointLight position={[10, 10, -15]} color="#ddf" />
                <pointLight
                    position={[10, 10, 15]}
                    color="#ddf"
                    intensity={0.5}
                />
                <Ground />
                <Player />
                <Coins updateScore={updateScore} />
                <Trees updateScore={resetScore} />
                <>
                    <Ball position={[-6, 1, -14]} />
                    <Ball position={[-3, 1, -14]} />
                    <Ball position={[0, 1, -14]} />
                    <Ball position={[3, 1, -14]} />
                    <Ball position={[6, 1, -14]} />
                </>
                <Snow />
            </Canvas>
        </div>
    );
}

export default App;
