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
    const tagRef = useRef();

    const { AddAlert } = useContext(AlertsContext);

    const [date, setDate] = useState(new Date());
    const [tags, setTags] = useState([]);
    if (!open) return null

    const HandleSubmit = () => {
        CreateTaskInDB(nameRef, descriptionRef, date);
        onClose();
        clearTags();
        AddAlert("success", "Task Added Successfully");
        reRenderFunction();
    }
    const clearTags = () => {
        setTags([]);
    }

    const AddTags = () => {
        setTags((tag) => {
            return tag.concat({ ID: tag.length, name: tagRef.current.value })
        })
    }
    return (
        <Fragment>
            <div className="popup-overlay"></div>
            <div className="Popup">
                <button onClick={()=>{clearTags();onClose()}} className="CloseButton"><span className="material-symbols-outlined rotateanim">close</span></button>
                <div className="header-wrap">
                    <div className="title-wrap">
                        <div className="title">Task Name</div>
                        <input className="text-input" ref={nameRef} type="text" placeholder="Task Name..." required />
                    </div>
                </div>

                <div className="tags-wrapper">

                    <div className="title">Tags:</div>
                    <input className="text-input" ref={tagRef} type="text" placeholder="Press enter to add tags" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            AddTags();
                        }
                    }} />
                    {tags.length === 0 ?
                        <div className="tags">No tags added</div>
                        :
                        <div className="tags">
                            {tags.map((obj) => {
                                return <div key={obj.ID} className="tag">{obj.name}</div>
                            })}
                        </div>
                    }

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