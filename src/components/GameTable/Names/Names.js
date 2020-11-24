import React from "react";
import "./Names.scss";

const Names = ({ names, pause, edit }) => (
    <div className="names">
        <div>
            {names && names.map((name, i) => (
                <div key={i} className={pause && pause.includes(i) ? "paused" : ""} onClick={() => edit(i)}>{name}</div>
            ))}
        </div>
    </div>
)

export default Names;
