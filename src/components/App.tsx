import React, { useState, useEffect } from "react";
import JSONCrush from "jsoncrush";
import { useLocalStorage } from "usehooks-ts";
import "./App.scss";
import Header from "./Header";
import SettingsDialog from "./SettingsDialog";
import ShareDialog from "./ShareDialog";
import NameChangeDialog from "./NameChangeDialog";
import SaveGamesDialog from "./SaveGamesDialog";
import GameTable from "./GameTable";
import Buttons from "./Buttons";
import Game from "Types/Game";
import Settings from "Types/Settings";

const App = () => {
    const [game, setGame] = useLocalStorage<Game>("game", {
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

    const update = (points: number[], mahjong: number): void => {
        setGame({
            ...game,
            points: [...game.points, points],
            mahjongs: [...game.mahjongs, mahjong],
            pause: game.pause && [...game.pause, game.pause[game.pause.length - 1]]
        });
    }

    const undoRound = (): void => {
        if (game.points.length) {
            setGame({
                ...game,
                points: game.points.slice(0, -1),
                mahjongs: game.mahjongs.slice(0, -1),
                pause: game.pause?.slice(0, -1) ?? null
            });
        }
    }

    const updateSettings = (settings: Settings, restart: boolean): void => {
        const noPlayersChange: number = settings.noPlayers - game.settings.noPlayers;
        setGame({
            ...game,
            names: noPlayersChange < 0
                ? game.names.slice(0, settings.noPlayers)
                : game.names.concat(Array(noPlayersChange).fill("")),
            points: restart ? [] : game.points.map(p => p.concat(Array(noPlayersChange).fill(0))),
            mahjongs: restart ? [] : game.mahjongs,
            pause:
                restart ? null : (game.pause || Array(game.points.length + 1).fill(null)).map((p, i) =>
                    i === game.points.length ? (p || []) : (p || []).concat(
                        Array(noPlayersChange).fill(null).map((_, i) => i + game.settings.noPlayers)
                    )
                ),
            settings
        });
    }

    const [nameChangePlayer, setNameChangePlayer] = useState<number>(-1);

    const updatePlayer = (name: string, paused: boolean): void => {
        let pause: number[][] | null = null;
        const round: number = game.points.length;
        const currentPause: number[] = game.pause ? game.pause[round] : [];

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

        setGame({
            ...game,
            names: game.names.map((n,i) => i === nameChangePlayer ? name : n),
            pause: pause || game.pause
        });

        setNameChangePlayer(-1);
    }

    const [shareOpen, showShare] = useState<boolean>(false);
    const [settingsOpen, showSettings] = useState<boolean>(false);
    const [saveGamesOpen, showSaveGames] = useState<boolean>(false);

    const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

    useEffect(() => {
        if (location.search?.includes("g=")) {
            try {
                setGame(JSON.parse(JSONCrush.uncrush(decodeURIComponent(location.search.substring(location.search.indexOf("g=") + 2)))));
            } catch(e: Error) {
                console.error(`Could not load gamestate from query. ${e}`);
            }
        }

        history.replaceState({}, document.title, location.protocol + "//" + location.host + location.pathname);
    }, []);

    return (
        <>
            <Header
                showShare={() => {
                    showShare(!settingsOpen);
                    showSettings(false);
                    showSaveGames(false);
                }}
                showSettings={() => {
                    showSettings(!settingsOpen);
                    showShare(false);
                    showSaveGames(false);
                }}
                showSaveGames={() => {
                    showSaveGames(!saveGamesOpen);
                    showShare(false);
                    showSettings(false);
                }}
            />
            { shareOpen && <ShareDialog
                gameData={JSONCrush.crush(JSON.stringify(game))}
                closeShare={() => showShare(false)}
            /> }
            { settingsOpen && <SettingsDialog
                settings={game.settings}
                updateSettings={updateSettings}
                closeSettings={() => showSettings(false)}
                newGame={game.points.length === 0}
            /> }
            { nameChangePlayer >= 0 && <NameChangeDialog
                name={game.names[nameChangePlayer]}
                paused={!!(game.pause?.[game.pause.length - 1].includes(nameChangePlayer))}
                updatePlayer={updatePlayer}
                cancel={() => setNameChangePlayer(-1)}
            /> }
            { saveGamesOpen && <SaveGamesDialog
                game={game}
                open={(g: Game) => setGame(g)}
                close={() => showSaveGames(false)}
            /> }
            <GameTable
                game={game}
                update={update}
                nameClick={setNameChangePlayer}
                setAllowSubmit={setAllowSubmit}
            />
            <Buttons undoRound={undoRound} allowUndo={!!game.points.length} allowSubmit={allowSubmit} />
        </>
    )
}

export default App;