import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {increaseSpeed, selectTeeterTotter, updateStatus} from "../../store/teeter-totter";
import {Shape} from "./shape";
import React, {useEffect, useMemo, useState} from "react";
import {TeeterTotterContext} from "./context";
import {TeeterTotterStatus} from "../../store/teeter-totter/types";
import {StyledBase, StyledBoard, StyledContainer, StyledContent} from "./styles";

const GRAVITY = 10;

export function TeeterTotter() {
    const dispatch = useAppDispatch();
    const {items, status} = useAppSelector(selectTeeterTotter);
    const [time, setTime] = useState(1);
    const [angle, setAngle] = useState(0);

    const velocity = useMemo(() => {
        let totalForce = 0;
        let inertia = 0;

        items.filter(item => item.isOnBoard).forEach((item) => {
            const mass = item.mass;
            const distance = (item.coordinates.x) / 10;
            totalForce += (mass * distance);
            inertia += (mass * Math.pow(distance, 2));
        }, 0);

        return totalForce * GRAVITY / inertia;
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(time => time + 1);
            dispatch(increaseSpeed())
        }, 500);

        return () => clearInterval(intervalId)
    }, [status]);

    useEffect(() => {
        setAngle(angle => {
            const newAngle = angle + velocity * time;
            return newAngle >= 30 ? 30 : newAngle <= -30 ? -30 : newAngle
        });
    }, [velocity, time]);

    useEffect(() => {
        if (angle === 30 || angle === -30) {
            dispatch(updateStatus(TeeterTotterStatus.Completed))
        }
    }, [angle]);

    return (
        <TeeterTotterContext.Provider value={{angle}}>
            <StyledContainer>
                <StyledContent>
                    {items.map((item, index) => <Shape index={index} key={index} item={item}/>)}
                    <StyledBoard angle={angle}/>
                    <StyledBase/>
                </StyledContent>
            </StyledContainer>

        </TeeterTotterContext.Provider>
    )
}
