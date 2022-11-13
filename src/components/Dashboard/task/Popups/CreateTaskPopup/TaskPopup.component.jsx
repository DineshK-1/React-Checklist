import { Fragment, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "./TaskPopup.styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import { CreateTaskInDB } from "../../../../../utils/firebase/firebase.utils";
import { useContext } from "react";
import { AlertsContext } from "../../../../../contexts/Alerts.context";

const TaskPopup = ({ open, onClose }) => {

    const nameRef = useRef();
    const descriptionRef = useRef();

    const { AddAlert } = useContext(AlertsContext)

    const [date, setDate] = useState(new Date());
    if (!open) return null

    return (
        <Fragment>
            <div className="popup-overlay"></div>
            <div className="Popup">
                <button onClick={onClose} className="CloseButton"><span className="material-symbols-outlined rotateanim">close</span></button>
                <div className="header-wrap">
                    <div className="title-wrap">
                        <div className="title">Task Name</div>
                        <input className="text-input" ref={nameRef} type="text" placeholder="Task Name..." required />
                    </div>
                </div>

                <div className="dates">
                    <span>Due Date:</span>
                    <DatePicker selected={date} onChange={(Date) => setDate(Date)} minDate={new Date()} />
                </div>

                <div className="description">Description:</div>
                <textarea name="" rows="5" placeholder="Description..." ref={descriptionRef} required></textarea>
                <button className="Submit" onClick={() => { CreateTaskInDB(nameRef, descriptionRef, date); onClose(); AddAlert("success", "Task Added Successfully"); }}>Add Task</button>
            </div>
        </Fragment>
    )
}

export default TaskPopup;