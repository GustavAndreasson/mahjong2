import React from "react";
import "./Names.scss";

const Names = ({ names, change }) => (
    <div className="names">
        <div>
            {names && names.map((name, i) => (
                <div key={i} onClick={() => change(i)}>{name}</div>
            ))}
        </div>
    </div>
)

export default Names;
