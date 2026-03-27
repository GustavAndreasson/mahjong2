export enum PointsDistribution {
    ALL_GET_POINTS,
    MAHJONG_GET_POINTS,
    ALL_PAYS_ALL,
    ALL_PAYS_MAHJONG
}

export default interface Settings {
    noPlayers: number;
    pointsDistribution: PointsDistribution;
    startPoints: number;
}