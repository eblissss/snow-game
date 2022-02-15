import React, { useEffect, useState } from "react";

function Score(props: { score: number }) {
    const [scoreStr, setScoreStr] = useState("Score: 0");

    useEffect(() => {
        setScoreStr("Score: " + props.score);

        return () => {
            <h2>{scoreStr}</h2>;
        };
    }, [props.score, scoreStr]);

    return <h2>{scoreStr}</h2>;
}

export default Score;
