import React, { useState } from "react";
import { useLocalstorageState } from "rooks";
import Game from "Types/Game";
import "./SaveGamesDialog.scss";

interface SaveGamesDialogProps {
    game: Game;
    open: (game: Game) => void;
    close: () => void;
}

interface Save extends Game {
    date: string
}

const SaveGamesDialog = ({ game, open, close }: SaveGamesDialogProps) => {
    const [saveList, setSaveList] = useLocalstorageState<Save[]>("savelist", []);
    const bestSave = saveList.reduce(
        (res, save, i) => game.names.join() === save.names.join() && save.date > res[1] ? [i, save.date] : res
        , [-1, "0"]
    )[0];
    const [currentSave, setCurrentSave] = useState<number>(bestSave);
    const now = (new Date()).toISOString();

    const handleSave = (): void => {
        setSaveList(currentSave === -1
            ? [...saveList, {...game, date: now}]
            : saveList.map((save, i) => i === currentSave ? {...game, date: now} : save)
        )
        close();
    }

    const handleOpen = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        open(saveList[currentSave]);
        close();
    }

    const handleRemove = (): void => {
        setSaveList(saveList.filter((_, i) => i !== currentSave));
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
                    { saveList.map((save, i) => (
                        <div key={i}
                            className={"option" + (i === currentSave ? " selected" : "")}
                            onClick={() => setCurrentSave(i)}
                        >
                            <span className="save-names">{save.names.join(" ")}</span>
                            <span className="save-date">{save.date.slice(0, 10)}</span>
                        </div>
                    ))}
                </div>
                <div className="confirm">
                    <button type="button" onClick={close}>Avbryt</button>
                    <button type="button" onClick={handleSave}>Spara</button>
                    <button type="button" onClick={handleRemove} disabled={currentSave === -1}>Ta bort</button>
                    <button type="submit" disabled={currentSave === -1}>Öppna</button>
                </div>
            </form>
        </div>
    )
}

export default SaveGamesDialog;
