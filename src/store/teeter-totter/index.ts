import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../types';
import {TeeterTotterSide, TeeterTotterState, TeeterTotterStatus} from "./types";
import {createTeeterTotterItem} from "./helper";

const initialState: TeeterTotterState = {
    speed: 1,
    status: TeeterTotterStatus.Running,
    items: [createTeeterTotterItem()]
};

export const teeterTotterSlice = createSlice({
    name: 'teeterTooter',
    initialState,
    reducers: {
        addItem: (state) => {
            const item = createTeeterTotterItem(TeeterTotterSide.Left);
            state.items = [...state.items, item]
        },
        toggleStatus: (state) => {
            state.status = state.status === TeeterTotterStatus.Stopped ? TeeterTotterStatus.Running : TeeterTotterStatus.Stopped;
        }
    },
});

export const {addItem, toggleStatus} = teeterTotterSlice.actions;


export const selectStatus = (state: RootState) => state.teeterTotter.status;

export default teeterTotterSlice.reducer;
