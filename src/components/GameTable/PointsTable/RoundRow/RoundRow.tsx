import React from "react";
import "./RoundRow.scss";

interface RoundRowProps {
    points: number[];
    mahjong: number;
    pause: number[] | null;
}

const RoundRow = ({ points, mahjong, pause }: RoundRowProps) => (
    <div className="round-row">
        { points?.map((point, i) => (
            <div key={i} className={pause?.includes(i) ? "paused" : ""}>
                { mahjong == i && <span className="token">M</span> }
                { point }
            </div>
        ))}
    </div>
)

export default RoundRow;
