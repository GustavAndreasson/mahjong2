import React from "react";
import "./Header.scss";

const Header = ({ showSettings, showSaveGames }) => (
    <>
        <div className="header">
            <h1>Mahjong poängtabell</h1>
            <button className="settings-button fas fa-cog" onClick={showSettings}></button>
            <button className="save-button fas fa-save" onClick={showSaveGames}></button>
        </div>
        <div className="headerspacer" />
    </>
)

export default Header;
