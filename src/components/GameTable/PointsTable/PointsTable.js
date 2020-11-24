import React, {Fragment} from "react";
import "./PointsTable.scss";
import PointsRow from "./PointsRow";
import RoundRow from "./RoundRow";
import TransactionRow from "./TransactionRow";

const winds = ["東", "南", "西", "北", "X"];

const PointsTable = ({ points, mahjongs, pause, settings }) => {
    let pointsSum = Array(settings.noPlayers).fill(settings.startPoints);
    let windPlayer = 0;
    while (pause && pause[0] && pause[0].includes(windPlayer) && windPlayer < settings.noPlayers * 2) {
        windPlayer += 1;
    }
    let wind = 0;
    let transactions = [];
    const calculateTransactions = round => {
        transactions = Array(settings.noPlayers).fill(0);
        if (settings.pointsDistribution >= 2) {
            points[round].forEach((p, i) => {
                points[round].forEach((p2, j) => {
                    if (!(pause && pause[round] && (pause[round].includes(i) || pause[round].includes(j))) && i != j) {
                        transactions[i] += i == mahjongs[round] ? p : (j == mahjongs[round] ? -p2 : p - p2);
                    }
                });
            });
        } else {
            transactions = points[round];
        }
        windPlayer = mahjongs[round] == windPlayer ? windPlayer : windPlayer + 1;
        while (pause && pause[round + 1] && pause[round + 1].includes(windPlayer % settings.noPlayers) && windPlayer < settings.noPlayers * 2) {
            windPlayer += 1;
        }
        if (windPlayer >= settings.noPlayers) {
            windPlayer = windPlayer % settings.noPlayers;
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
                        <RoundRow points={round} mahjong={mahjongs[i]} pause={pause && pause[i]} />
                        { settings.pointsDistribution >= 2 &&
                            <TransactionRow points={transactions} pause={pause && pause[i]} />
                        }
                        <PointsRow points={pointsSum} windPlayer={windPlayer} wind={winds[wind]} pause={pause && pause[i]} />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default PointsTable;
