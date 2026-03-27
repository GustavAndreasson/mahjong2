import React from "react";
import "./RoundRow.scss";
import { PointsDistribution } from "Types/Settings";

interface RoundRowProps {
    points: number[];
    mahjong: number;
    pause: number[] | null;
    pointsDistribution: PointsDistribution;
}

const RoundRow = ({ points, mahjong, pause, pointsDistribution }: RoundRowProps) => (
    <div className="round-row">
        { points?.map((point, i) => (
            <div key={i} className={pause?.includes(i) ? "paused" : ""}>
                { mahjong === i && <span className="token">M</span> }
                { (mahjong === i
                    || pointsDistribution === PointsDistribution.ALL_GET_POINTS
                    || pointsDistribution === PointsDistribution.ALL_PAYS_ALL)
                    && point }
            </div>
        ))}
    </div>
)

export default RoundRow;
