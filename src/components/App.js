import React, { useState } from "react";
import "./App.scss";
import Header from "./Header";
import Settings from "./Settings";
import NameChange from "./NameChange";
import SaveGames from "./SaveGames";
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
        setGame(Object.assign({}, game, {
            points: [...game.points, points],
            mahjongs: [...game.mahjongs, mahjong]
        }));
    }

    const undoRound = () => {
        if (game.points.length) {
            setGame(Object.assign({}, game, {
                points: game.points.slice(0, game.points.length - 1),
                mahjongs: game.mahjongs.slice(0, game.mahjongs.length - 1)
            }));
        }
    }

    const updateSettings = settings => {
        setGame(Object.assign({}, game, {
            points: [],
            mahjongs: [],
            settings: settings
        }));
    }

    const [nameChangePlayer,setNameChangePlayer] = useState(-1);

    const updateName = name => {
        setGame(Object.assign({}, game, {
            names: game.names.map((n,i) => i == nameChangePlayer ? name : n)
        }));
        setNameChangePlayer(-1);
    }

    const [saveGamesOpen, showSaveGames] = useState(false);

    return (
        <>
            <Header showSettings={() => showSettings(true)} showSaveGames={() => showSaveGames(true)}/>
            { settingsOpen && <Settings
                settings={game.settings}
                updateSettings={updateSettings}
                closeSettings={() => showSettings(false)}
                newGame={game.points.length === 0}
            /> }
            { nameChangePlayer >= 0 && <NameChange
                name={game.names[nameChangePlayer]}
                updateName={updateName}
            /> }
            { saveGamesOpen && <SaveGames
                game={game}
                open={g => setGame(g)}
                close={() => showSaveGames(false)}
            /> }
            <GameTable game={game} update={update} nameClick={setNameChangePlayer} />
            <Buttons undoRound={undoRound} />
        </>
    )
}

export default App;
