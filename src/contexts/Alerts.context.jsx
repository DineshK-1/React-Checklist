import { useState } from "react";
import { createContext } from "react";

export const AlertsContext = createContext(null);



export const AlertsProvider = ({ children }) => {
    const [message, setMessage] = useState(null);

    const RemoveAlerts = () => {
        setTimeout(() => {
            setMessage(([first, ...others]) => [...others]);
        }, 3000);
    }

    const AddAlert = (type, mess) => {
        if (message == null) {
            setMessage([{ type: type, message: mess }]);
        } else {
            setMessage(message => [...message, { type: type, message: mess }]);
        }
        RemoveAlerts();
    }

    const value = { message, AddAlert }

    return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
}