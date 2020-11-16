import React from "react";
import "./Names.scss";

const Names = ({ names }) => (
    <div className="names">
        <div>
            {names && names.map((name, i) => (
                <div key={i}>{name}</div>
            ))}
        </div>
    </div>
)

export default Names;
