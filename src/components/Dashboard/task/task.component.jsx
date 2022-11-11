import { useState } from 'react'
import './task.styles.scss'

const Task = (props) => {
    const [state, setState] = useState(false);
    const TestFunction = () => {
        if (state) {
            setState(false)
        } else {
            setState(true)
        }
    }

    return (
        <div className="task">
            <div className="left">
                {state ? <button className='task-done' onClick={TestFunction}>Done</button> : <button className='task-pending' onClick={TestFunction}>Not Done</button>}
                <h4 className='name'>{props.name}</h4>
                <div className="date">27 Nov 2022</div>
                <div className="date due">28 Nov 2022</div>
            </div>
            <div className="right">
                <button><span className="material-symbols-outlined md-18">edit</span></button>
            </div>
        </div>
    )
}

export default Task;