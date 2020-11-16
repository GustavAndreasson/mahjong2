import React from "react";
import "./PointsRow.scss";

const PointsRow = ({ points, wind }) => (
    <div className="points-row">
        { points &&  points.map((point, i) => (
            <div key={i}>
                { wind == i && <span className="token">Ö</span> }
                { point }
            </div>
        ))}
    </div>
)

export default PointsRow;
