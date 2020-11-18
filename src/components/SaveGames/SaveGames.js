import React, { useState } from "react";
import useLocalStorage from "Hooks/useLocalStorage";
import "./SaveGames.scss";

const SaveGames = ({ game, open, close }) => {
    const [saveList, setSaveList] = useLocalStorage("savelist", []);
    const [currentSave, setCurrentSave] = useState(-1);
    const now = (new Date()).toISOString();
    const handleSave = () => {
        setSaveList(currentSave == -1
            ? [...saveList, {...game, date: now}]
            : saveList.map((s, i) => i === currentSave ? {...game, date: now} : s)
        )
        close();
    }
    const handleOpen = e => {
        e.preventDefault();
        open(saveList[currentSave]);
        close();
    }
    const handleRemove = () => {
        setSaveList(saveList.filter((s, i) => i !== currentSave));
        setCurrentSave(-1);
    }

    return (
        <div className="save-games popup">
            <div className="pu-background"></div>
            <form onSubmit={handleOpen}>
                <div className="select">
                    <div
                        className={"option" + (currentSave === -1 ? " selected" : "")}
                        onClick={() => setCurrentSave(-1)}
                    >
                        <span className="save-names">Nytt spel</span>
                        <span className="save-date"></span>
                    </div>
                    { saveList.map((s, i) => (
                        <div key={i}
                            className={"option" + (i === currentSave ? " selected" : "")}
                            onClick={() => setCurrentSave(i)}
                        >
                            <span className="save-names">{s.names.join(" ")}</span>
                            <span className="save-date">{s.date.slice(0,10)}</span>
                        </div>
                    ))}
                </div>
                <div className="confirm">
                    <button type="button" onClick={close}>Avbryt</button>
                    <button type="button" onClick={handleSave}>Spara</button>
                    <button type="button" onClick={handleRemove} disabled={currentSave===-1}>Ta bort</button>
                    <button type="submit" disabled={currentSave===-1}>Öppna</button>
                </div>
            </form>
        </div>
    )
}

export default SaveGames;
