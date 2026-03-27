import React, { useState, useEffect } from "react";
import "./PointsInput.scss";
import type Settings from "Types/Settings";

interface PointsInputProps {
    settings: Settings;
    pause: number[] | null;
    update: (points: number[], mahjong: number) => void;
    setAllowSubmit: (allow: boolean) => void;
}

const PointsInput = ({ settings, pause, update, setAllowSubmit }: PointsInputProps) => {
    const [values, setValues] = useState<string[]>(Array(settings.noPlayers).fill(""));
    const [mahjong, setMahjong] = useState<number>(-1);
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (mahjong >= 0 && (
            ((settings.pointsDistribution === 2 || settings.pointsDistribution === 0)
                && values.every((v: string, i: number) => /^\d+$/.test(v) || (pause?.includes(i))))
            || ((settings.pointsDistribution === 3 || settings.pointsDistribution === 1)
                &&/^\d+$/.test(values[mahjong]))
        )) {
            update(values.map((v: string, i: number) =>
                (settings.pointsDistribution === 2
                || settings.pointsDistribution === 0
                || i === mahjong)
                && !(pause?.includes(i))
                ? Number.parseInt(v) : 0
            ), mahjong);
            setValues(Array(settings.noPlayers).fill(""));
            setMahjong(-1);
        }
    }

    useEffect(() => {
        setValues(Array(settings.noPlayers).fill(""));
    }, [settings]);

    useEffect(() => {
        setAllowSubmit(mahjong >= 0 && (
            ((settings.pointsDistribution === 2 || settings.pointsDistribution === 0)
                && values.every((v: string, i: number) => /^\d+$/.test(v) || (pause?.includes(i))))
            || ((settings.pointsDistribution === 3 || settings.pointsDistribution === 1)
                && /^\d+$/.test(values[mahjong]))
        ));
    }, [values, mahjong]);

    return (
        <div className="points-input">
            <form id="points-form" onSubmit={handleSubmit}>
                {values?.map((value, i) => (
                    <div key={i} className={"input-cell" + (pause?.includes(i) ? " paused" : "")}>
                        <span className="token">
                            <input type="radio" name="mahjong" id={"mahjong_" + i} value={i}
                                checked={mahjong === i}
                                onChange={e => setMahjong(Number.parseInt(e.target.value))}
                                disabled={pause?.includes(i)}
                            />
                            <label htmlFor={"mahjong_" + i}>M</label>
                        </span>
                        <input type="number" step="1" maxLength="3" size="3"
                            value={value}
                            onChange={e => setValues(values.map((v, j) => i===j ? e.target.value : v))}
                            onFocus={e => e.target.select()}
                            disabled={
                                (pause?.includes(i))
                                || ((settings.pointsDistribution === 1 || settings.pointsDistribution === 3) && mahjong !== i)
                            }
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}

export default PointsInput;
