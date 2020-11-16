import React, {Fragment} from "react";
import "./PointsTable.scss";
import PointsRow from "./PointsRow";
import RoundRow from "./RoundRow";
import TransactionRow from "./TransactionRow";

const winds = ["東", "南", "西", "北", "X"];

const PointsTable = ({ points, mahjongs, settings }) => {
    let pointsSum = Array(settings.noPlayers).fill(settings.startPoints);
    let windPlayer = 0;
    let wind = 0;
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
        if (windPlayer >= settings.noPlayers) {
            windPlayer = 0;
            wind += 1;
        }
        pointsSum = pointsSum.map((p, i) => p + transaction[i]);
    }

    return (
        <div className="points-table">
            <PointsRow points={pointsSum} wind={0} />
            { points && points.map((round, i) => {
                calculateTransaction(i);
                return (
                    <Fragment key={i}>
                        <RoundRow points={round} mahjong={mahjongs[i]} />
                        { settings.pointsDistribution >= 2 &&
                            <TransactionRow points={transaction} />
                        }
                        <PointsRow points={pointsSum} windPlayer={windPlayer} wind={winds[wind]} />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default PointsTable;
