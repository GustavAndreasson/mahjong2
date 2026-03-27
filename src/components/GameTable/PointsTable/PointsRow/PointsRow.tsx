import React from "react";
import "./PointsRow.scss";

interface PointsRowProps {
    points: number[];
    windPlayer: number;
    wind: string;
    pause?: number[] | null;
}

const PointsRow = ({ points, windPlayer, wind, pause }: PointsRowProps) => (
    <div className="points-row">
        { points?.map((point, i) => (
            <div key={i} className={pause?.includes(i) ? "paused" : ""}>
                { windPlayer == i && <span className="token">{wind}</span> }
                { point }
            </div>
        ))}
    </div>
)

export default PointsRow;
