import {
    MAX_MASS,
    TEETER_TOTTER_WIDTH,
    TeeterTotterItem,
    TeeterTotterItemTypes, TeeterTotterState, TeeterTotterStatus,
} from "./types";

export function getInitialState(): TeeterTotterState {
    const itemCount = Math.ceil(Math.random() * 5);
    const itemsOnBoard = Array(itemCount).fill(null).map(() => {
        const oneSideWidth = TEETER_TOTTER_WIDTH / 2;
        const coordinates = {
            x: (Math.random() * oneSideWidth),
            y: 0
        }
        return {...createTeeterTotterItem(coordinates), isOnBoard: true};
    });

    return {
        speed: 1,
        status: TeeterTotterStatus.Running,
        items: [...itemsOnBoard, createTeeterTotterItem()],
    }
}

export function createTeeterTotterItem(coordinates: { x: number, y: number } = {x: -250, y: -300}): TeeterTotterItem {
    const mass = Math.ceil(Math.random() * MAX_MASS);
    const type = Math.floor(Math.random() * 3) as TeeterTotterItemTypes;

    return {
        type,
        coordinates,
        isOnBoard: false,
        mass
    }
}
