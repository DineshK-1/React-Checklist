import { createContext } from "react";

export const TaskContext = createContext();

TaskContextProvider = ({children}) => {
    
    return <TaskContext.Provider value={"hi"}>{children}</TaskContext.Provider>
}