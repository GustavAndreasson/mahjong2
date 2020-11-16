import React from "react";
import "./PointsRow.scss";

const PointsRow = ({ points, windPlayer, wind }) => (
    <div className="points-row">
        { points &&  points.map((point, i) => (
            <div key={i}>
                { windPlayer == i && <span className="token">{wind}</span> }
                { point }
            </div>
        ))}
    </div>
)

export default PointsRow;
