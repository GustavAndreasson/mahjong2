import Settings from "./Settings";

export default interface Game {
    names: string[];
    points: number[][];
    mahjongs: number[];
    pause: number[][] | null;
    settings: Settings;
}