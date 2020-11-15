import React from "react";

const PointsInput = ({ settings }) => (
    <div className="points-input">
        <div>
            {settings && [...Array(settings.noPlayers)].map((_, i) => (
                <div key={i} className="input-cell">
                    <span className="token">
                        <input type="radio" name="mahjong" id={"mahjong_" + i} value="0" />
                        <label htmlFor={"mahjong_" + i}>M</label>
                    </span>
                    <input type="number" step="1" maxLength="3" size="3" />
                </div>
            ))}
        </div>
    </div>
)

export default PointsInput;
