import { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "./TaskPopup.styles.scss";
import "react-datepicker/dist/react-datepicker.css";

const TaskPopup = ({ open, onClose }) => {
    const [date, setDate] = useState(new Date());
    if (!open) return null

    return (
        <Fragment>
            <div className="popup-overlay"></div>
            <div className="Popup">
                <button onClick={onClose} className="CloseButton"><span class="material-symbols-outlined rotateanim">close</span></button>
                <div className="header-wrap">
                    <div className="title-wrap">
                        <div className="title">Task Name</div>
                        <input class="text-input" type="text" placeholder="Task Name..." />
                    </div>
                </div>

                <div className="dates">
                    <span>Due Date:</span>
                    <DatePicker selected={date} onChange={(Date) => setDate(Date)} minDate={new Date()} />
                </div>

                <div className="description">Description:</div>
                <textarea name="" rows="5" placeholder="Description..."></textarea>
                <button className="Submit">Add Task</button>
            </div>
        </Fragment>
    )
}

export default TaskPopup;