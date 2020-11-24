import React, { useState } from "react";
import "./NameChange.scss";

const NameChange = ({ name, paused, updatePlayer, cancel }) => {
    const [newName, setName] = useState(name);
    const [newPaused, setPaused] = useState(paused);
    const handleSubmit = e => {
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

export default NameChange;
