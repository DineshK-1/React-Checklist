import { Fragment, useState } from 'react'
import './task.styles.scss'
import DateComp from './Date/Date.component';

import TaskPopup from './Popups/CreateTaskPopup/TaskPopup.component';
import { DeleteTaskInDB } from '../../../utils/firebase/firebase.utils';

const Task = (props) => {
    const [state, setState] = useState(false);
    const TestFunction = () => {
        if (state) {
            setState(false)
        } else {
            setState(true)
        }
    }

    const [taskPopupState, setTaskPopupState] = useState(false);

    return (
        <Fragment>
            <TaskPopup open={taskPopupState} onClose={() => setTaskPopupState(false)} />
            <div className="task">
                <div className="left">
                    {state ? <button className='task done' onClick={TestFunction}>Done</button> : <button className='task pending' onClick={TestFunction}>Not Done</button>}
                    <h4 className='name'>{props.name}</h4>
                    <DateComp date={props.createdDate.seconds} type={"green"} />
                    <DateComp date={props.dueDate.seconds} type={"due"} />
                </div>
                <div className="right">
                    <button className='custom-button' onClick={() => setTaskPopupState(true)}><span className="material-symbols-outlined md-18">edit</span></button>
                    <button className='custom-button' onClick={() => { DeleteTaskInDB(props.ID); props.reRenderFunction() }}><span className="material-symbols-outlined md-18">delete</span></button>
                </div>
            </div>
        </Fragment>
    )
}

export default Task;