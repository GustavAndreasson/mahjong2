import React, {useEffect, useState} from "react";
import "./PointsInput.scss";
import Settings, {PointsDistribution} from "Types/Settings";

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
            ((settings.pointsDistribution === PointsDistribution.ALL_PAYS_ALL
                    || settings.pointsDistribution === PointsDistribution.ALL_GET_POINTS)
                && values.every((v, i) => /^\d+$/.test(v) || (pause?.includes(i))))
            || ((settings.pointsDistribution === PointsDistribution.ALL_PAYS_MAHJONG
                    || settings.pointsDistribution === PointsDistribution.MAHJONG_GET_POINTS)
                &&/^\d+$/.test(values[mahjong]))
        )) {
            update(values.map((v, i) =>
                (settings.pointsDistribution === PointsDistribution.ALL_PAYS_ALL
                || settings.pointsDistribution === PointsDistribution.ALL_GET_POINTS
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
            ((settings.pointsDistribution === PointsDistribution.ALL_PAYS_ALL
                    || settings.pointsDistribution === PointsDistribution.ALL_GET_POINTS)
                && values.every((v, i) => /^\d+$/.test(v) || (pause?.includes(i))))
            || ((settings.pointsDistribution === PointsDistribution.ALL_PAYS_MAHJONG
                    || settings.pointsDistribution === PointsDistribution.MAHJONG_GET_POINTS)
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
                                || ((settings.pointsDistribution === PointsDistribution.MAHJONG_GET_POINTS
                                    || settings.pointsDistribution === PointsDistribution.ALL_PAYS_MAHJONG)
                                    && mahjong !== i)
                            }
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}

export default PointsInput;
