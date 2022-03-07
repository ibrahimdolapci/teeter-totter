import {TeeterTotterItem} from "../../store/teeter-totter/types";
import {createElement, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {moveDown, moveLeft, moveRight, selectTeeterTotter, setOnBoard} from "../../store/teeter-totter";
import {useTeeterTotter} from "./context";
import { shapeComponentsMap } from "./styles";

type ShapeProps = { index: number, item: TeeterTotterItem }

function FallenShape({item}: ShapeProps) {
    const {angle} = useTeeterTotter();
    const {speed} = useAppSelector(selectTeeterTotter);

    const boardCoordinates = useMemo(() => {
        const radian = angle * Math.PI / 180;
        const y = Math.tan(radian) * (item.coordinates.x);
        return {x: item.coordinates.x, y};
    }, [angle, item.coordinates.x]);

    return createElement(shapeComponentsMap[item.type], {
        coordinates: boardCoordinates,
        isOnBoard: item.isOnBoard,
        mass: item.mass,
        speed
    });
}

function FallingShape({item, index}: ShapeProps) {
    const dispatch = useAppDispatch();
    const {angle} = useTeeterTotter();
    const {speed} = useAppSelector(selectTeeterTotter);

    useEffect(() => {
        const radian = angle * Math.PI / 180;
        const boardHorizontalCoordinate = Math.tan(radian) * (item.coordinates.x);
        const isOnBoard = boardHorizontalCoordinate <= item.coordinates.y;
        if (isOnBoard) {
            dispatch(setOnBoard({index}));
        }
    }, [item, angle]);

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(moveDown({index}))
        }, 500);

        return () => clearInterval(id)
    }, [index]);

    useEffect(() => {
        const move = ({keyCode}: KeyboardEvent) => {
            if (keyCode === 37) {
                dispatch(moveLeft({index}))
            }

            if (keyCode === 39) {
                dispatch(moveRight({index}))
            }
        };

        window.addEventListener("keydown", move);

        return () => {
            window.removeEventListener("keydown", move);
        };
    }, [item.isOnBoard, index])

    return createElement(shapeComponentsMap[item.type], {
        coordinates: item.coordinates,
        isOnBoard: item.isOnBoard,
        speed,
        mass: item.mass
    });
}

export function Shape(props: ShapeProps) {
    return props.item.isOnBoard ? <FallenShape {...props} /> : <FallingShape {...props} />
}
