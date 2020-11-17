import React from "react";
import "./Header.scss";

const Header = ({ showSettings }) => (
    <div className="header">
        <h1>Mahjong poängtabell</h1>
        <button onClick={showSettings}>Inställningar</button>
    </div>
)

export default Header;
