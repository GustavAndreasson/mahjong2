import React, { useState } from "react";
import "./NameChangeDialog.scss";

interface NameChangeProps {
    name: string;
    paused: boolean;
    updatePlayer: (name: string, paused: boolean) => void;
    cancel: () => void;
}

const NameChangeDialog = ({ name, paused, updatePlayer, cancel }: NameChangeProps) => {
    const [newName, setName] = useState<string>(name);
    const [newPaused, setPaused] = useState<boolean>(paused);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        updatePlayer(newName, newPaused);
    }

    return (
        <div className="name-change popup">
            <div className="pu-background"></div>
            <form onSubmit={handleSubmit}>
                <div className="name">
                    <div className="text">Vad heter spelaren?</div>
                    <input type="text"
                           autoFocus
                           value={newName}
                           onChange={e => setName(e.target.value)}
                           onFocus={e => e.target.select()}
                    />
                </div>
                <div className="pause">
                    <input type="radio" name="pause" value="false" id="player_active"
                           checked={!newPaused} onChange={e => setPaused(e.target.value === "true")}
                    />
                    <label htmlFor="player_active">Spelar</label>
                    <input type="radio" name="pause" value="true" id="player_pause"
                           checked={newPaused} onChange={e => setPaused(e.target.value === "true")}
                    />
                    <label htmlFor="player_pause">Pausad</label>
                </div>
                <div className="confirm">
                    <button type="button" onClick={cancel}>Avbryt</button>
                    <button type="submit">OK</button>
                </div>
            </form>
        </div>
    )
}

export default NameChangeDialog;