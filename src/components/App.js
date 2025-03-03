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
        pause: null,
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
            mahjongs: [...game.mahjongs, mahjong],
            pause: game.pause && [...game.pause, game.pause[game.pause.length - 1]]
        }));
    }

    const undoRound = () => {
        if (game.points.length) {
            setGame(Object.assign({}, game, {
                points: game.points.slice(0, game.points.length - 1),
                mahjongs: game.mahjongs.slice(0, game.mahjongs.length - 1),
                pause: game.pause && game.pause.slice(0, game.pause.length - 1)
            }));
        }
    }

    const updateSettings = (settings, restart) => {
        const noPlayersChange = settings.noPlayers - game.settings.noPlayers;
        setGame(Object.assign({}, game, {
            names: noPlayersChange < 0
                ? game.names.slice(0, settings.noPlayers)
                : game.names.concat(Array(noPlayersChange).fill("")),
            points: restart ? [] : game.points.map(p => p.concat(Array(noPlayersChange).fill(0))),
            mahjongs: restart ? [] : game.mahjongs,
            pause: restart ? null : (game.pause || Array(game.points.length + 1).fill(null)).map((p, i) =>
                i == game.points.length ? (p || []) : (p || []).concat(
                    Array(noPlayersChange).fill(null).map((_, i) => i + game.settings.noPlayers)
                )
            ),
            settings: settings
        }));
    }

    const [nameChangePlayer, setNameChangePlayer] = useState(-1);

    const updatePlayer = (name, paused) => {
        let pause = null;
        const round = game.points.length;
        const currentPause = game.pause ? game.pause[round] : [];
        if (currentPause.includes(nameChangePlayer) && !paused) {
            pause = Object.assign([], game.pause,
                {[round]: currentPause.filter(p => p !== nameChangePlayer)}
            );
        } else if (!currentPause.includes(nameChangePlayer) && paused) {
            if (game.pause) {
                pause = Object.assign([], game.pause,
                    {[round]: [...currentPause, nameChangePlayer]}
                );
            } else {
                pause = Object.assign([], [], {[round]: [nameChangePlayer]});
            }
        }
        setGame(Object.assign({}, game, {
            names: game.names.map((n,i) => i == nameChangePlayer ? name : n),
            pause: pause || game.pause
        }));
        setNameChangePlayer(-1);
    }

    const [saveGamesOpen, showSaveGames] = useState(false);

    const [allowSubmit, setAllowSubmit] = useState(false);

    return (
        <>
            <Header
		showSettings={() => {
		    showSettings(!settingsOpen);
		    showSaveGames(false);
		}}
		showSaveGames={() => {
		    showSaveGames(!saveGamesOpen);
		    showSettings(false);
		}}
	    />
            { settingsOpen && <Settings
                settings={game.settings}
                updateSettings={updateSettings}
                closeSettings={() => showSettings(false)}
                newGame={game.points.length === 0}
            /> }
            { nameChangePlayer >= 0 && <NameChange
                name={game.names[nameChangePlayer]}
                paused={game.pause && game.pause[game.pause.length - 1].includes(nameChangePlayer) || false}
                updatePlayer={updatePlayer}
                cancel={() => setNameChangePlayer(-1)}
            /> }
            { saveGamesOpen && <SaveGames
                game={game}
                open={g => setGame(g)}
                close={() => showSaveGames(false)}
            /> }
            <GameTable game={game} update={update} nameClick={setNameChangePlayer} setAllowSubmit={setAllowSubmit} />
            <Buttons undoRound={undoRound} allowUndo={!!game.points.length} allowSubmit={allowSubmit} />
        </>
    )
}

export default App;
