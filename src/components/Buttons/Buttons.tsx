import React from "react";
import "./Buttons.scss";

interface ButtonsProps {
    undoRound: () => void;
    allowUndo: boolean;
    allowSubmit: boolean;
}

const Buttons = ({ undoRound, allowUndo, allowSubmit }: ButtonsProps) => (
    <div className="buttons">
        <button type="submit" form="points-form" disabled={!allowSubmit}>OK</button>
        <button type="button" onClick={undoRound} disabled={!allowUndo}>Ångra</button>
    </div>
)

export default Buttons;
