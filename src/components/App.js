import React from "react";
import "./App.scss";
import GameTable from "./GameTable";

const App = () => {
    const game = {
        names: ["Gösta", "Helge", "Folke", "Cecilia"],
        points: [[2, 4, 6, 8], [8, 6, 4, 2]],
        mahjongs: [0, 2],
        settings: {
            noPlayers: 4,
            pointsDistribution: 2,
            startPoints: 2000
        }
    }

    return (
        <GameTable game={game}/>
    )
}

export default App;
