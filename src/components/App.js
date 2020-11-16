import React, { useState } from "react";
import "./App.scss";
import GameTable from "./GameTable";
import Buttons from "./Buttons";

const App = () => {
    const [game, setGame] = useState({
        names: ["Gösta", "Helge", "Folke", "Cecilia"],
        points: [[2, 4, 6, 8], [8, 6, 4, 2]],
        mahjongs: [0, 2],
        settings: {
            noPlayers: 4,
            pointsDistribution: 2,
            startPoints: 2000
        }
    });

    const update = (points, mahjong) => {
        setGame(Object.assign({}, game,
            {points: [...game.points, points]},
            {mahjongs: [...game.mahjongs, mahjong]})
        );
    }

    const undoRound = () => {
        setGame(Object.assign({}, game,
            {points: game.points.slice(0, game.points.length - 1)},
            {mahjongs: game.mahjongs.slice(0, game.mahjongs.length - 1)})
        );
    }

    return (
        <>
            <GameTable game={game} update={update}/>
            <Buttons undoRound={undoRound}/>
        </>
    )
}

export default App;
