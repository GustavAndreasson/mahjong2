import React from "react";
import "./PointsTable.scss";
import PointsRow from "./PointsRow";
import RoundRow from "./RoundRow";
import TransactionRow from "./TransactionRow";

const PointsTable = ({ points, mahjongs, settings }) => {
    let pointsSum = Array(settings.noPlayers).fill(settings.startPoints);
    let windPlayer = 0;
    let transaction = [];
    const calculateTransaction = round => {
        transaction = Array(settings.noPlayers).fill(0);
        if (settings.pointsDistribution >= 2) {
            points[round].forEach((p, i) => {
                points[round].forEach((p2, j) => {
                    if (i != j) {
                        transaction[i] += i == mahjongs[round] ? p : (j == mahjongs[round] ? -p2 : p - p2);
                    }
                });
            });
        } else {
            transaction = points[round];
        }


        windPlayer = mahjongs[round] == windPlayer ? windPlayer : windPlayer + 1;
        pointsSum = pointsSum.map((p, i) => p + transaction[i]);
    }

    return (
        <div className="points-table">
            <PointsRow key="points-init" points={pointsSum} wind={0} />
            { points && points.map((round, i) => {
                calculateTransaction(i);
                return (
                    <>
                        <RoundRow key={"round-" + i} points={round} mahjong={mahjongs[i]} />
                        { settings.pointsDistribution >= 2 &&
                            <TransactionRow key={"transaction-" + i} points={transaction} />
                        }
                        <PointsRow key={"points-" + i} points={pointsSum} wind={windPlayer} />
                    </>
                )
            })}
        </div>
    )
}

export default PointsTable;
