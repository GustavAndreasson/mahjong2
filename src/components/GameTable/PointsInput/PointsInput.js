import React, { useState } from "react";
import "./PointsInput.scss";

const PointsInput = ({ settings }) => {
    const [values, setValues] = useState(Array(settings.noPlayers).fill(""));
    const [mahjong, setMahjong] = useState(-1);
    const handleSubmit = () => {
        if (mahjong >= 0 && values.every(v => v === parseInt(v, 10))) {
            console.log(values);
        } else {
            console.log("nope");
        }
    }

    return (
        <div className="points-input">
            <form onSubmit={handleSubmit}>
                {settings && [...Array(settings.noPlayers)].map((_, i) => (
                    <div key={i} className="input-cell">
                        <span className="token">
                            <input type="radio" name="mahjong" id={"mahjong_" + i} value={i}
                                checked={mahjong == i}
                                onChange={e => setMahjong(e.target.value)}
                            />
                            <label htmlFor={"mahjong_" + i}>M</label>
                        </span>
                        <input type="number" step="1" maxLength="3" size="3"
                            value={values[i]}
                            onChange={e => setValues(values.map((v, j) => i===j ? e.target.value : v))}
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}

export default PointsInput;
