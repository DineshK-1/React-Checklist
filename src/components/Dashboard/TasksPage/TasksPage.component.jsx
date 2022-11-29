import "./TasksPage.styles.scss"

import { Fragment, useState, useEffect } from "react"
import { FetchTaskInDB } from "../../../utils/firebase/firebase.utils"
import Header from "../Header/Header.component"
import TaskPopup from "./task/Popups/CreateTaskPopup/TaskPopup.component"
import Task from "./task/task.component"
import { motion } from "framer-motion"

const TaskPage = () => {
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
            <TaskPopup open={createTask} reRenderFunction={ReRender} onClose={() => setCreateTask(false)} />
            <div className="my-tasks">
                <h2>My Tasks</h2>

                {tasks.length === 0 ? <div className="empty">No tasks were created!</div> : <Fragment>

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
                </Fragment>}
            </div>
            <motion.button drag dragConstraints={{top:0,bottom:0,right:0,left:0}} className='Bottom custom-button' onClick={() => { setCreateTask(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Task</span></motion.button>
        </Fragment >
    )
}

export default TaskPage;