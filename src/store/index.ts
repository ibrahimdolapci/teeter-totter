import { configureStore } from '@reduxjs/toolkit';
import teeterTotterReducer from './teeter-totter';

export const store = configureStore({
    reducer: {
        teeterTotter: teeterTotterReducer
    },
});
