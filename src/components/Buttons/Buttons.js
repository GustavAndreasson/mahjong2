import React from "react";
import "./Buttons.scss";

const Buttons = ({ undoRound }) => (
    <div className="buttons">
        <button type="submit" form="points-form">OK</button>
        <button type="button" onClick={undoRound}>Ångra</button>
    </div>
)

export default Buttons;
