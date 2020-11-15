import React from "react";

const PointsRow = ({ points, wind }) => (
    <div className="points-row">
        { points &&  points.map((point, i) => (
            <div key={i}>
                { wind == i && <span className="Token">Ö</span> }
                { point }
            </div>
        ))}
    </div>
)

export default PointsRow;
