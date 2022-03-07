export const MAX_MASS = 10;
export const TEETER_TOTTER_WIDTH = 500;

export enum TeeterTotterItemTypes {
    Triangle,
    Rectangle,
    Circle
}

export interface TeeterTotterItem {
    mass: number;
    isOnBoard: boolean;
    type: TeeterTotterItemTypes;
    coordinates: {
        x: number,
        y: number
    };
}

export enum TeeterTotterStatus {
    Stopped,
    Running,
    Completed,
}

export interface TeeterTotterState {
    speed: number;
    status: TeeterTotterStatus;
    items: TeeterTotterItem[]
}
