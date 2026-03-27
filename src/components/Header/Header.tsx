import React from "react";
import "./Header.scss";

interface HeaderProps {
    showShare: () => void;
    showSettings: () => void;
    showSaveGames: () => void;
}
const Header = ({ showShare, showSettings, showSaveGames }: HeaderProps) => (
    <>
        <div className="header">
            <h1>Mahjong poängtabell</h1>
            <button className="share-button fas fa-share" onClick={showShare}></button>
            <button className="settings-button fas fa-cog" onClick={showSettings}></button>
            <button className="save-button fas fa-save" onClick={showSaveGames}></button>
        </div>
        <div className="headerspacer" />
    </>
)

export default Header;
