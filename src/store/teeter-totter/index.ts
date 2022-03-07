import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../types';
import {TeeterTotterStatus} from "./types";
import {createTeeterTotterItem, getInitialState} from "./helper";

export const teeterTotterSlice = createSlice({
    name: 'teeterTooter',
    initialState: getInitialState(),
    reducers: {
        updateStatus: (state, {payload}: PayloadAction<TeeterTotterStatus>) => {
            state.status = payload;
        },
        moveDown: (state, {payload}: PayloadAction<{ index: number }>) => {
            state.items[payload.index].coordinates.y += state.speed + 30;
        },
        moveLeft: (state, {payload}: PayloadAction<{ index: number }>) => {
            state.items[payload.index].coordinates.x -= 20;
            state.items[payload.index].coordinates.x = Math.max(-250, state.items[payload.index].coordinates.x);
        },
        moveRight: (state, {payload}: PayloadAction<{ index: number }>) => {
            state.items[payload.index].coordinates.x += 20;
            state.items[payload.index].coordinates.x = Math.min(250, state.items[payload.index].coordinates.x);
        },
        setOnBoard: (state, {payload}: PayloadAction<{ index: number }>) => {
            state.items[payload.index].isOnBoard = true;
            state.items = [...state.items, createTeeterTotterItem()];
        },
        increaseSpeed: (state) => {
            state.speed += state.speed * 0.02;
        },
    }
});

export const {moveLeft, moveRight, moveDown, setOnBoard, updateStatus, increaseSpeed} = teeterTotterSlice.actions;

export const selectTeeterTooter = (state: RootState) => state.teeterTotter;

export default teeterTotterSlice.reducer;
