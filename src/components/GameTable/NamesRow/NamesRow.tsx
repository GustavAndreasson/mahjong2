import React from "react";
import "./NamesRow.scss";

interface NamesRowProps {
    names: string[];
    pause: number[] | null;
    edit: (index: number) => void;
}

const NamesRow = ({ names, pause, edit }: NamesRowProps) => (
    <div className="names">
        <div>
            { names.map((name, i) => (
                <div key={i} className={pause?.includes(i) ? "paused" : ""} onClick={() => edit(i)}>
                    { pause?.includes(i) &&
                        <span className="fas fa-pause"></span>
                    }
                    { name }
                </div>
            ))}
        </div>
    </div>
)

export default NamesRow;
