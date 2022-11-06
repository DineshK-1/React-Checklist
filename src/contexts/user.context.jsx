import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setCurrentUser] = useState(null)
    const value = { user, setCurrentUser }
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}