import React, { useState } from "react";
import "./Settings.scss";
import ConfirmNewGame from "./ConfirmNewGame";

const Settings = ({ settings, updateSettings, closeSettings, newGame }) => {
    const [noPlayers, setNoPlayers] = useState(settings.noPlayers);
    const [pointsDistribution, setPointsDistribution] = useState(settings.pointsDistribution);
    const [startPoints, setStartPoints] = useState(settings.startPoints);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (noPlayers < settings.noPlayers) {
            alert("Det går inte sänka antalet spelare i ett pågående spel.\nAnvänd pausfunktionen på spelaren som slutar.");
        } else {
            saveSettings(false);
        }
    }

    const startNewGame = () => {
        if (newGame) {
            saveSettings(true);
        } else {
            setShowConfirm(true);
        }
    }

    const saveSettings = restart => {
        updateSettings({
            noPlayers: noPlayers,
            pointsDistribution: pointsDistribution,
            startPoints: startPoints
        }, restart);
        closeSettings();
    }

    return (
        <div className="settings popup">
            <div className="pu-background"></div>
            <form onSubmit={handleSubmit}>
                <div className="setting">
                    <span className="setting-label">Antal spelare</span>
                    <span className="setting-options">
                        <input type="radio" name="no-players" value="2" id="no-players-2"
                            checked={noPlayers == 2}
                            onChange={e => setNoPlayers(parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-2">Två</label>
                        <input type="radio" name="no-players" value="3" id="no-players-3"
                            checked={noPlayers == 3}
                            onChange={e => setNoPlayers(parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-3">Tre</label>
                        <input type="radio" name="no-players" value="4" id="no-players-4"
                            checked={noPlayers == 4}
                            onChange={e => setNoPlayers(parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-4">Fyra</label>
                        <input type="radio" name="no-players" value="5" id="no-players-5"
                            checked={noPlayers == 5}
                            onChange={e => setNoPlayers(parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-5">Fem</label>
                    </span>
                </div>
                <div className="setting">
                    <span className="setting-label">Antal spelare</span>
                    <span className="setting-options">
                        <input type="radio" name="points-distribution" value="0" id="points-distribution-0"
                            checked={pointsDistribution == 0}
                            onChange={e => setPointsDistribution(parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-0">Alla får poäng</label><br />
                        <input type="radio" name="points-distribution" value="1" id="points-distribution-1"
                            checked={pointsDistribution == 1}
                            onChange={e => setPointsDistribution(parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-1">Mahjong får poäng</label><br />
                        <input type="radio" name="points-distribution" value="2" id="points-distribution-2"
                            checked={pointsDistribution == 2}
                            onChange={e => setPointsDistribution(parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-2">Alla betalar till alla</label><br />
                        <input type="radio" name="points-distribution" value="3" id="points-distribution-3"
                            checked={pointsDistribution == 3}
                            onChange={e => setPointsDistribution(parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-3">Alla betalar till Mahjong</label>
                    </span>
                </div>
                <div className="setting">
                    <span className="setting-label">Poäng från start</span>
                    <span className="setting-options">
                        <input type="number" step="1"
                            value={startPoints}
                            onChange={e => setStartPoints(parseInt(e.target.value))}
                        />
                    </span>
                </div>
                <div className="confirm">
                    <button type="button" onClick={closeSettings}>Avbryt</button>
                    <button type="button" onClick={startNewGame}>Nytt spel</button>
                    <button type="submit">OK</button>
                </div>
            </form>
            { showConfirm &&
                <ConfirmNewGame confirm={() => saveSettings(true)} cancel={() => setShowConfirm(false)} />
            }
        </div>
    )
}

export default Settings;
