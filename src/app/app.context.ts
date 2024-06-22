import {createContext, useContext} from "react";
import {AppController} from "./app.controller";

export const AppContext = createContext<AppController>(null as any)
export const useAppContext = () => {
    return useContext(AppContext)
}