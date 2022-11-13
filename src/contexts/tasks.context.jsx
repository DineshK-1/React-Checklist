import { createContext } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {

    return <TaskContext.Provider value={"hi"}>{children}</TaskContext.Provider>
}