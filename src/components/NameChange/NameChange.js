import React, { useState } from "react";
import "./NameChange.scss";

const NameChange = ({ name, updateName }) => {
    const [newName, setName] = useState(name);
    const handleSubmit = e => {
        e.preventDefault();
        updateName(newName);
    }

    return (
        <div className="name-change popup">
            <div className="pu-background"></div>
            <form onSubmit={handleSubmit}>
                <div className="text">Vad heter spelaren?</div>
                <input type="text"
                    autoFocus
                    value={newName}
                    onChange={e => setName(e.target.value)}
                    onFocus={e => e.target.select()}
                />
                <div className="confirm">
                    <button type="button" onClick={() => updateName(name)}>Avbryt</button>
                    <button type="submit">OK</button>
                </div>
            </form>
        </div>
    )
}

export default NameChange;
