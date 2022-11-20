import { Fragment, useState } from 'react'
import './task.styles.scss'
import DateComp from './Date/Date.component';

import TaskPopup from './Popups/CreateTaskPopup/TaskPopup.component';
import { DeleteTaskInDB, SetTaskStateInDB } from '../../../utils/firebase/firebase.utils';
import { useContext } from 'react';
import { AlertsContext } from '../../../contexts/Alerts.context';

const Task = (props) => {
    const [desc, setDesc] = useState(false);
    const [check, setCheck] = useState(props.taskDone);

    const { AddAlert } = useContext(AlertsContext)

    const HandleCheck = () => {
        SetTaskStateInDB(props.id, check)
        setCheck(!check);
    }

    const [taskPopupState, setTaskPopupState] = useState(false);

    return (
        <Fragment>
            <TaskPopup open={taskPopupState} onClose={() => setTaskPopupState(false)} />
            <div className="task">
                <div className="top">
                    <div className="left">
                        <input type="checkbox" checked={check} onChange={HandleCheck} />
                        <h4 className='name'>{props.name}</h4>
                        <DateComp date={props.createdDate.seconds} type={"green"} />
                        <DateComp date={props.dueDate.seconds} type={"due"} />
                    </div>
                    <div className="right">
                        <button className='custom-button' onClick={() => setDesc(!desc)}><span className="material-symbols-outlined md-18">expand_more</span></button>
                        <button className='custom-button' onClick={() => setTaskPopupState(true)}><span className="material-symbols-outlined md-18">edit</span></button>
                        <button className='custom-button' onClick={() => { DeleteTaskInDB(props.ID); props.reRenderFunction(); AddAlert("success", "Task Deleted Successfully"); }}><span className="material-symbols-outlined md-18">delete</span></button>
                    </div>
                </div>
                <div className="bottom">
                    <div className={desc ? "desc checked" : "desc"}>
                        {props.description}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Task;