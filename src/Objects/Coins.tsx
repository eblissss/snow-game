import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import Coin from "./Meshes/Coin";

let t = 0;
let id = 0;

interface CoinsProps {
    updateScore: () => void;
}

function Coins(props: CoinsProps): JSX.Element {
    const [coins, setCoins] = useState([<></>]);

    useFrame((state, delta) => {
        const newCoins: JSX.Element[] = [...coins];
        t += delta;
        if (t > Math.random() + 0.4) {
            t = 0;
            id += 2;
            const xPos = Math.random() * 12 - 6;
            newCoins.push(
                <Coin
                    position={[xPos, 0.7, 10]}
                    key={id}
                    updateScore={props.updateScore}
                />
            );
        }
        if (newCoins.length > 10) {
            newCoins.shift();
        }

        setCoins([...newCoins]);
    });

    return <>{coins}</>;
}

export default Coins;
