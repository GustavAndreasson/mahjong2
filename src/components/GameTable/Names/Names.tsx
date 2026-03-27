import React from "react";
import "./Names.scss";

interface NamesProps {
    names: string[];
    pause: number[] | null;
    edit: (index: number) => void;
}

const Names = ({ names, pause, edit }: NamesProps) => (
    <div className="names">
        <div>
            { names?.map((name, i) => (
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

export default Names;
