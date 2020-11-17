import React, { useState } from "react";
import "./App.scss";
import Header from "./Header";
import Settings from "./Settings";
import GameTable from "./GameTable";
import Buttons from "./Buttons";
import useLocalStorage from "Hooks/useLocalStorage";

const App = () => {
    const [game, setGame] = useLocalStorage("game", {
        names: ["Gösta", "Helge", "Folke", "Cecilia"],
        points: [],
        mahjongs: [],
        settings: {
            noPlayers: 4,
            pointsDistribution: 2,
            startPoints: 2000
        }
    });

    const [settingsOpen, showSettings] = useState(false);

    const update = (points, mahjong) => {
        setGame(Object.assign({}, game,
            {points: [...game.points, points]},
            {mahjongs: [...game.mahjongs, mahjong]}
        ));
    }

    const undoRound = () => {
        if (game.points.length) {
            setGame(Object.assign({}, game,
                {points: game.points.slice(0, game.points.length - 1)},
                {mahjongs: game.mahjongs.slice(0, game.mahjongs.length - 1)}
            ));
        }
    }

    const updateSettings = settings => {
        showSettings(false);
        setGame(Object.assign({}, game,
            {settings: settings}
        ));
    }

    return (
        <>
            <Header showSettings={() => showSettings(true)} />
            { settingsOpen && <Settings
                settings={game.settings}
                updateSettings={updateSettings}
                closeSettings={() => showSettings(false)}
            /> }
            <GameTable game={game} update={update} />
            <Buttons undoRound={undoRound} />
        </>
    )
}

export default App;
