import React from "react";
import "./Header.scss";

const Header = ({ showSettings, showSaveGames }) => (
    <div className="header">
        <h1>Mahjong poängtabell</h1>
        <button onClick={showSettings}>Inställningar</button>
        <button onClick={showSaveGames}>Spara/Öppna</button>
    </div>
)

export default Header;
