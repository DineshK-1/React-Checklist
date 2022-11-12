import { Fragment, useState } from 'react'
import './task.styles.scss'
import Date from './Date/Date.component';

import TaskPopup from './Popups/CreateTaskPopup/TaskPopup.component';

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
                    <Date date="27 Nov 2022" type={"green"} />
                    <Date date="28 Nov 2022" type={"due"} />
                </div>
                <div className="right">
                    <button className='custom-button' onClick={() => setTaskPopupState(true)}><span className="material-symbols-outlined md-18">edit</span></button>
                </div>
            </div>
        </Fragment>
    )
}

export default Task;