import React from "react";
import "./GameTable.scss";
import Names from "./Names";
import PointsInput from "./PointsInput";
import PointsTable from "./PointsTable";
import type Game from "Types/Game";

interface GameTableProps {
        game: Game;
        update: (points: number[], mahjong: number) => void;
        nameClick: (index: number) => void;
        setAllowSubmit: (allow: boolean) => void;
}

const GameTable = ({ game, update, nameClick, setAllowSubmit }: GameTableProps) => (
    <div className="game-table">
        <Names
            names={game.names}
            pause={game.pause?.[game.pause.length - 1] ?? null}
            edit={nameClick}
        />
        <PointsInput
            settings={game.settings}
            pause={game.pause?.[game.pause.length - 1] ?? null}
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
