import { useContext } from "react";
import { createPortal } from "react-dom";
import { AlertsContext } from "../../contexts/Alerts.context";
import "./PopupAlert.styles.scss"

const PopupAlert = () => {
    const { message } = useContext(AlertsContext);

    if (message == null || message.length === 0) return null
    return createPortal(
        <div className="popup-alert">
            {message.map(mess => {
                return <li>{mess.message}</li>
            })}
        </div>,
        document.getElementById("AlertPortal")
    )
}

export default PopupAlert;