import {createContext, useContext} from "react";

export const TeeterTotterContext = createContext({angle: 0});

export function useTeeterTooter() {
    return useContext(TeeterTotterContext);
}
