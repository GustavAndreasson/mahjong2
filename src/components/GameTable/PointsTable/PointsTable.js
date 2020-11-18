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
    let transactions = [];
    const calculateTransactions = round => {
        transactions = Array(settings.noPlayers).fill(0);
        if (settings.pointsDistribution >= 2) {
            points[round].forEach((p, i) => {
                points[round].forEach((p2, j) => {
                    if (i != j) {
                        transactions[i] += i == mahjongs[round] ? p : (j == mahjongs[round] ? -p2 : p - p2);
                    }
                });
            });
        } else {
            transactions = points[round];
        }
        windPlayer = mahjongs[round] == windPlayer ? windPlayer : windPlayer + 1;
        if (windPlayer >= settings.noPlayers) {
            windPlayer = 0;
            wind += 1;
        }
        pointsSum = pointsSum.map((p, i) => p + transactions[i]);
    }

    return (
        <div className="points-table">
            <PointsRow points={pointsSum} windPlayer={windPlayer} wind={winds[wind]} />
            { points && points.map((round, i) => {
                calculateTransactions(i);
                return (
                    <Fragment key={i}>
                        <RoundRow points={round} mahjong={mahjongs[i]} />
                        { settings.pointsDistribution >= 2 &&
                            <TransactionRow points={transactions} />
                        }
                        <PointsRow points={pointsSum} windPlayer={windPlayer} wind={winds[wind]} />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default PointsTable;
