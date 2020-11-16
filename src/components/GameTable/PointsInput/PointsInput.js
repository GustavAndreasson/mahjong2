import React, { useState } from "react";
import "./PointsInput.scss";

const PointsInput = ({ settings, update }) => {
    const [values, setValues] = useState(Array(settings.noPlayers).fill(""));
    const [mahjong, setMahjong] = useState(-1);
    const handleSubmit = e => {
        e.preventDefault()
        if (mahjong >= 0 && (
            ((settings.pointsDistribution == 2 || settings.pointsDistribution == 0) && values.every(v => /^[0-9]+$/.test(v)))
            || /^[0-9]+$/.test(values[mahjong])
        )) {
            update(values.map((v, i) =>
                settings.pointsDistribution == 2
                || settings.pointsDistribution == 0
                || i == mahjong
                ? parseInt(v) : 0
            ), parseInt(mahjong));
            setValues(Array(settings.noPlayers).fill(""));
            setMahjong(-1);
        }
    }

    return (
        <div className="points-input">
            <form id="points-form" onSubmit={handleSubmit}>
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
