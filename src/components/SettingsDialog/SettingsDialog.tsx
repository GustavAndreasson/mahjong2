import React, { useState } from "react";
import "./SettingsDialog.scss";
import ConfirmNewGame from "./ConfirmNewGame";
import Settings, { PointsDistribution } from "Types/Settings";

interface SettingsDialogProps {
    settings: Settings;
    updateSettings: (settings: Settings, restart: boolean) => void;
    closeSettings: () => void;
    newGame: boolean;
}

const SettingsDialog = ({ settings, updateSettings, closeSettings, newGame }: SettingsDialogProps) => {
    const [noPlayers, setNoPlayers] = useState<number>(settings.noPlayers);
    const [pointsDistribution, setPointsDistribution] = useState<PointsDistribution>(settings.pointsDistribution);
    const [startPoints, setStartPoints] = useState<number>(settings.startPoints);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (noPlayers < settings.noPlayers) {
            alert("Det går inte sänka antalet spelare i ett pågående spel.\nAnvänd pausfunktionen på spelaren som slutar.");
        } else {
            saveSettings(false);
        }
    }

    const startNewGame = (): void => newGame ? saveSettings(true) : setShowConfirm(true);

    const saveSettings = (restart: boolean): void => {
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
                            checked={noPlayers === 2}
                            onChange={e => setNoPlayers(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-2">Två</label>
                        <input type="radio" name="no-players" value="3" id="no-players-3"
                            checked={noPlayers === 3}
                            onChange={e => setNoPlayers(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-3">Tre</label>
                        <input type="radio" name="no-players" value="4" id="no-players-4"
                            checked={noPlayers === 4}
                            onChange={e => setNoPlayers(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-4">Fyra</label>
                        <input type="radio" name="no-players" value="5" id="no-players-5"
                            checked={noPlayers === 5}
                            onChange={e => setNoPlayers(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="no-players-5">Fem</label>
                    </span>
                </div>
                <div className="setting">
                    <span className="setting-label">Poängutdelning</span>
                    <span className="setting-options">
                        <input type="radio" name="points-distribution" id="points-distribution-agp"
                            value={PointsDistribution.ALL_GET_POINTS}
                            checked={pointsDistribution === PointsDistribution.ALL_GET_POINTS}
                            onChange={e => setPointsDistribution(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-agp">Alla får poäng</label><br />
                        <input type="radio" name="points-distribution" id="points-distribution-mgp"
                            value={PointsDistribution.MAHJONG_GET_POINTS}
                            checked={pointsDistribution === PointsDistribution.MAHJONG_GET_POINTS}
                            onChange={e => setPointsDistribution(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-mgp">Mahjong får poäng</label><br />
                        <input type="radio" name="points-distribution" id="points-distribution-apa"
                            value={PointsDistribution.ALL_PAYS_ALL}
                            checked={pointsDistribution === PointsDistribution.ALL_PAYS_ALL}
                            onChange={e => setPointsDistribution(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-apa">Alla betalar till alla</label><br />
                        <input type="radio" name="points-distribution" id="points-distribution-apm"
                            value={PointsDistribution.ALL_PAYS_MAHJONG}
                            checked={pointsDistribution === PointsDistribution.ALL_PAYS_MAHJONG}
                            onChange={e => setPointsDistribution(Number.parseInt(e.target.value))}
                        />
                        <label htmlFor="points-distribution-apm">Alla betalar till Mahjong</label>
                    </span>
                </div>
                <div className="setting">
                    <span className="setting-label">Poäng från start</span>
                    <span className="setting-options">
                        <input type="number" step="1"
                            value={startPoints}
                            onChange={e => setStartPoints(Number.parseInt(e.target.value))}
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

export default SettingsDialog;
