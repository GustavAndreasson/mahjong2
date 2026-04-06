import React from "react";
import "./Header.scss";
import ShareButton from "./ShareButton";
import WakeLockButton from "./WakeLockButton";
import Game from "Types/Game";

interface HeaderProps {
    showShare: (link: string) => void;
    showSettings: () => void;
    showSaveGames: () => void;
    game: Game;
}
const Header = ({ showShare, showSettings, showSaveGames, game }: HeaderProps) => (
    <>
        <div className="header">
            <h1>Mahjong poängtabell</h1>
            <ShareButton showShare={showShare} game={game} />
            <WakeLockButton />
            <button className="settings-button fas fa-cog" onClick={showSettings} />
            <button className="save-button fas fa-save" onClick={showSaveGames} />
        </div>
        <div className="headerspacer" />
    </>
)

export default Header;
