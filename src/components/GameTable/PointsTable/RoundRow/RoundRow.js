import React from "react";

const RoundRow = ({ points, mahjong }) => (
    <div className="round-row">
        { points &&  points.map((point, i) => (
            <div key={i}>
                { mahjong == i && <span className="token">M</span> }
                { point }
            </div>
        ))}
    </div>
)

export default RoundRow;
