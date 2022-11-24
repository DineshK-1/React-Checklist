import { Fragment, useState } from 'react';
import './Dashboard.styles.scss'
import Header from './Header/Header.component';
import Task from './task/task.component';
import CreateTask from './task/Popups/CreateTaskPopup/TaskPopup.component';
import { useEffect } from 'react';
import { FetchTaskInDB } from '../../utils/firebase/firebase.utils';

const Dashboard = () => {
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        FetchTaskInDB().then((resp) => setTasks(resp));
    }, [])

    useEffect(() => {
        FetchTaskInDB().then((resp) => setTasks(resp));
    }, [updateTask])

    const ReRender = () => {
        setUpdateTask(!updateTask);
    }

    return (
        <Fragment>
            <CreateTask open={createTask} reRenderFunction={ReRender} onClose={() => setCreateTask(false)} />
            <div className="my-tasks">
                <h2>My Tasks</h2>

                {tasks.length == 0 ? <div className="empty">No tasks were created!</div> : null}
                <div className="tasks-wrapper">
                    <Header day="Pending Tasks" />
                    <div className="task-list">
                        {tasks.map(obj => {
                            if (!obj.taskDone) {
                                return <Task key={obj.id} {...obj} reRenderFunction={ReRender} />
                            }
                        })}
                    </div>
                </div>

                <div className="tasks-wrapper">
                    <Header day="Completed Tasks" />
                    
                    <div className="task-list">
                        {tasks.map(obj => {
                            if (obj.taskDone) {
                                return <Task key={obj.id} {...obj} reRenderFunction={ReRender} />
                            }
                        })}
                    </div>
                </div>
            </div>

            <button className='Bottom custom-button' onClick={() => { setCreateTask(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Task</span></button>
        </Fragment>
    )
}

export default Dashboard;