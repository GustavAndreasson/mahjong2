import React from "react";
import "./RoundRow.scss";

const RoundRow = ({ points, mahjong, pause }) => (
    <div className="round-row">
        { points &&  points.map((point, i) => (
            <div key={i} className={pause && pause.includes(i) ? "paused" : ""}>
                { mahjong == i && <span className="token">M</span> }
                { point }
            </div>
        ))}
    </div>
)

export default RoundRow;
