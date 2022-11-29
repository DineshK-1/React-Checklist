import "./TaskPopup.styles.scss";

import { Fragment, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { AlertsContext } from "../../../../../../contexts/Alerts.context"
import { CreateTaskInDB } from "../../../../../../utils/firebase/firebase.utils";

const TaskPopup = ({ open, onClose, reRenderFunction }) => {

    const nameRef = useRef();
    const descriptionRef = useRef();

    const { AddAlert } = useContext(AlertsContext);

    const [date, setDate] = useState(new Date());
    if (!open) return null

    const HandleSubmit = () => {
        CreateTaskInDB(nameRef, descriptionRef, date);
        onClose();
        AddAlert("success", "Task Added Successfully");
        reRenderFunction();
    }

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
                    <div className="tags">
                        <div class="dropdown">
                            <button className="custom-button">Tags</button>
                            <div class="dropdown-options">
                                <a href="#">School</a>
                                <a href="#">work</a>
                                <a href="#">Create Label</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dates">
                    <span>Due Date:</span>
                    <DatePicker selected={date} onChange={(Date) => setDate(Date)} minDate={new Date()} />
                </div>

                <div className="description">Description:</div>
                <textarea name="" rows="5" placeholder="Description..." ref={descriptionRef} required></textarea>
                <button className="Submit" onClick={HandleSubmit}>Add Task</button>
            </div>
        </Fragment>
    )
}

export default TaskPopup;