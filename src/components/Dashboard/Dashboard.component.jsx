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

                <div className="tasks-wrapper">
                    <Header day="Pending Tasks" />
                    {tasks.map(obj => {
                        const convertedDate = new Date(0);
                        convertedDate.setUTCSeconds(+obj.dueDate)
                        return <Task key={obj.id} {...obj} reRenderFunction={ReRender} />
                    })}
                </div>
            </div>

            <button className='Bottom custom-button' onClick={() => { setCreateTask(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Task</span></button>
        </Fragment>
    )
}

export default Dashboard;