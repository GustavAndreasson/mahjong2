import React from "react";
import "./GameTable.scss";
import Names from "./Names";
import PointsInput from "./PointsInput";
import PointsTable from "./PointsTable";

const GameTable = ({ game, update, nameClick }) => (
    <div className="game-table">
        <Names names={game.names} change={nameClick}/>
        <PointsInput settings={game.settings} update={update} />
        <PointsTable points={game.points} mahjongs={game.mahjongs} settings={game.settings} />
    </div>
)

export default GameTable;
