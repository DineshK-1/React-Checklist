import { useEffect } from "react";
import { createContext, useState } from "react";
import { GetDatabaseUserProfile, OnAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setCurrentUser] = useState(null)
    var isLoggedIn = (user ? true : false);

    const databaseData = async () => await GetDatabaseUserProfile();

    const value = { user, isLoggedIn, databaseData }

    useEffect(() => {
        const unsubscribe = OnAuthStateChangedListener((user) => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}