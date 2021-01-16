import React from "react";
import "./GameTable.scss";
import Names from "./Names";
import PointsInput from "./PointsInput";
import PointsTable from "./PointsTable";

const GameTable = ({ game, update, nameClick, setAllowSubmit }) => (
    <div className="game-table">
        <Names
            names={game.names}
            pause={game.pause && game.pause[game.pause.length - 1]}
            edit={nameClick}
        />
        <PointsInput
            settings={game.settings}
            pause={game.pause && game.pause[game.pause.length - 1]}
            update={update}
            setAllowSubmit={setAllowSubmit}
        />
        <PointsTable
            points={game.points}
            mahjongs={game.mahjongs}
            pause={game.pause}
            settings={game.settings}
        />
    </div>
)

export default GameTable;
