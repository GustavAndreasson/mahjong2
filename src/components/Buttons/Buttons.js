import React from "react";
import "./Buttons.scss";

const Buttons = ({ undoRound, allowUndo, allowSubmit }) => (
    <div className="buttons">
        <button type="submit" form="points-form" disabled={!allowSubmit}>OK</button>
        <button type="button" onClick={undoRound} disabled={!allowUndo}>Ångra</button>
    </div>
)

export default Buttons;
