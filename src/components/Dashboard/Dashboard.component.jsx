import { Fragment, useState } from 'react';
import './Dashboard.styles.scss'
import Header from './Header/Header.component';
import Task from './task/task.component';
import CreateTask from './task/Popups/CreateTaskPopup/TaskPopup.component';

const Dashboard = () => {
    const [createTask, setCreateTask] = useState(false)



    return (
        <Fragment>
            <CreateTask open={createTask} onClose={()=>setCreateTask(false)}></CreateTask>
            <div className="my-tasks">
                <h2>My Tasks</h2>
                <div className="tasks-wrapper">
                    <Header day="Today" />
                    <Task name="Test" />
                    <Task name="Test" />
                    <Task name="Test" />
                </div>
            </div>

            <button className='Bottom custom-button' onClick={() => setCreateTask(true)}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Task</span></button>
        </Fragment>
    )
}

export default Dashboard;