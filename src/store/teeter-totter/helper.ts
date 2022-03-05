import {
    Circle,
    MAX_MASS,
    Rectangle,
    TEETER_TOTTER_WIDTH,
    TeeterTotterItemTypes,
    TeeterTotterSide,
    Triangle
} from "./types";

const itemShapesMap = {
    [TeeterTotterItemTypes.Circle]: Circle,
    [TeeterTotterItemTypes.Rectangle]: Rectangle,
    [TeeterTotterItemTypes.Triangle]: Triangle,
}

export function createTeeterTotterItem(side: TeeterTotterSide = TeeterTotterSide.Right) {
    const mass = Math.random() * MAX_MASS;

    const type = Math.floor(Math.random() * 3) as TeeterTotterItemTypes;
    const Shape = itemShapesMap[type];

    const shape = new Shape(mass);

    const multiplier = side == TeeterTotterSide.Right ? 1 : -1;
    const oneSideWidth = TEETER_TOTTER_WIDTH / 2;
    const position = multiplier * (Math.random() * oneSideWidth) + oneSideWidth;

    return {
        shape,
        position
    }
}
