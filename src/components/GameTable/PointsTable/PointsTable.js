import React from "react";
import PointsRow from "./PointsRow";
import RoundRow from "./RoundRow";
import TransactionRow from "./TransactionRow";

const PointsTable = ({ points, mahjongs, settings }) => {
    const calculateTransactions = i => points[i];

    let pointsSum = Array(settings.noPlayers).fill(settings.startPoints);
    return (
        <div className="points-table">
            <PointsRow key="points-init" points={pointsSum} wind={0} />
            { points && points.map((round, i) => {
                let transaction = calculateTransactions(i);
                pointsSum = pointsSum.map((p, i) => p + transaction[i]);
                return (
                    <>
                        <RoundRow key={"round-" + i} points={round} mahjong={mahjongs[i]} />
                        { (settings.pointsDistribution == 2 || settings.pointsDistribution == 3) &&
                            <TransactionRow key={"transaction-" + i} points={transaction} />
                        }
                        <PointsRow key={"points-" + i} points={pointsSum} wind={i} />
                    </>
                )
            })}
        </div>
    )
}

export default PointsTable;
