import "./TasksPage.styles.scss"

import { Fragment, useState, useEffect } from "react"
import { FetchTaskInDB } from "../../../utils/firebase/firebase.utils"
import TaskPopup from "./task/Popups/CreateTaskPopup/TaskPopup.component"
import Task from "./task/task.component"
import { motion } from "framer-motion"

const TaskPage = () => {
    const [createTask, setCreateTask] = useState(false)
    const [updateTask, setUpdateTask] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [pendingTask, setPendingTask] = useState(true)
    const [overdueTask, setOverdueTask] = useState(false)
    const [completedTask, setCompletedTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        FetchTaskInDB().then((resp) => setTasks(resp)).finally(setIsLoading(false));
    }, [])

    useEffect(() => {
        FetchTaskInDB().then((resp) => setTasks(resp));
    }, [updateTask])

    const ReRender = () => {
        setUpdateTask(!updateTask);
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <Fragment>
            <TaskPopup open={createTask} reRenderFunction={ReRender} onClose={() => setCreateTask(false)} />
            <div className="my-tasks">
                <h2>My Tasks</h2>

                {tasks.length === 0 ? <div className="empty">No tasks were created!</div> : <Fragment>
                    <div className="tasks-wrapper">
                        <div className="header"><motion.span animate={{ rotate: overdueTask ? 0 : -90 }} className="material-symbols-outlined" onClick={() => setOverdueTask(!overdueTask)}>expand_more</motion.span>Overdue Tasks</div>
                        {overdueTask && <motion.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }} className="task-list">
                            {tasks.map(obj => {
                                const dueDate = new Date(0)
                                dueDate.setUTCSeconds(+obj.dueDate.seconds)
                                const currentDate = new Date()
                                console.log(dueDate)
                                if (currentDate > dueDate && !obj.taskDone) {
                                    return <Task key={obj.id} {...obj} reRenderFunction={ReRender} />
                                }
                                return null;
                            })}
                        </motion.div>}
                    </div>

                    <div className="tasks-wrapper">
                        <div className="header"><motion.span animate={{ rotate: pendingTask ? 0 : -90 }} className="material-symbols-outlined" onClick={() => setPendingTask(!pendingTask)}>expand_more</motion.span>Pending Tasks</div>
                        {pendingTask && <motion.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }} className="task-list">
                            {tasks.map(obj => {
                                if (!obj.taskDone) {
                                    return <Task key={obj.id} {...obj} reRenderFunction={ReRender} />
                                }
                                return null;
                            })}
                        </motion.div>}
                    </div>

                    <div className="tasks-wrapper">
                        <div className="header"><motion.span animate={{ rotate: completedTask ? 0 : -90 }} className="material-symbols-outlined" onClick={() => setCompletedTask(!completedTask)}>expand_more</motion.span>Completed Tasks</div>
                        {completedTask && <motion.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }} className="task-list">
                            {tasks.map(obj => {
                                if (obj.taskDone) {
                                    return <Task key={obj.id} {...obj} reRenderFunction={ReRender} />
                                }
                                return null;
                            })}
                        </motion.div>}
                    </div>
                </Fragment>}
            </div>
            <motion.button drag dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }} className='Bottom custom-button' onClick={() => { setCreateTask(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Task</span></motion.button>
        </Fragment >
    )
}

export default TaskPage;