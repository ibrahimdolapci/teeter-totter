export const MAX_MASS = 10;
export const TEETER_TOTTER_WIDTH = 10;

export enum TeeterTotterItemTypes {
    Triangle,
    Rectangle,
    Circle
}

export class TeeterTotterBaseShape {
    type = TeeterTotterItemTypes.Rectangle;
    height: number;

    get width() {
        return 1
    }

    /**
     * NOTE: Area assumed equal to mass
     * @param mass
     */
    constructor(public mass: number) {
        // Height will be generated randomly between 0 and maximum mass.
        // Height will vary with mass
        this.height = (Math.random() * MAX_MASS) / this.mass;
    }
}

export class Triangle extends TeeterTotterBaseShape {
    readonly type = TeeterTotterItemTypes.Triangle;

    get width() {
        // Area = (1 / 2) * Base * Perpendicular Height
        // Base = Area * 2 / Perpendicular Height
        return (this.mass * 2) / this.height;
    }
}

export class Rectangle extends TeeterTotterBaseShape {
    readonly type = TeeterTotterItemTypes.Rectangle;

    get width() {
        // Area = Width * Height;
        // Width = Area / Height
        return this.mass * this.height;
    }
}

export class Circle extends TeeterTotterBaseShape {
    readonly type = TeeterTotterItemTypes.Circle;

    get width() {
        // Area = pi * Square of radius;
        // Width = 2 * Square root of area divided by pi.
        return 2 * Math.sqrt(this.mass / Math.PI);
    }
}

export interface TeeterTotterItem {
    shape: TeeterTotterBaseShape,
    position: number;
}

export enum TeeterTotterStatus {
    Stopped,
    Running
}

export interface TeeterTotterState {
    speed: number;
    status: TeeterTotterStatus;
    items: TeeterTotterItem[]
}

export enum TeeterTotterSide {
    Left,
    Right
}
