import "./HabitsPage.styles.scss"

import { motion } from "framer-motion"
import { useState } from "react"
import { Fragment } from "react"
import "../TasksPage/task/Popups/CreateTaskPopup/TaskPopup.styles.scss"
import "../TasksPage/TasksPage.styles.scss"
import { useRef } from "react"
import { CreateHabitInDB, FetchHabitInDB } from "../../../utils/firebase/firebase.utils"
import { useContext } from "react"
import { AlertsContext } from "../../../contexts/Alerts.context"
import { useEffect } from "react"
import Habits from "./Habits.component"

const HabitsPage = () => {
    const [createHabit, setCreateHabit] = useState(false)
    const nameRef = useRef()
    const descriptionRef = useRef()

    const [habits, setHabits] = useState([])

    const [updateHabit, setUpdateHabit] = useState(false)

    const { AddAlert } = useContext(AlertsContext);

    useEffect(() => {
        FetchHabitInDB().then((resp) => setHabits(resp))
    }, [])

    useEffect(() => {
        FetchHabitInDB().then((resp) => setHabits(resp));
    }, [updateHabit])

    const ReRender = () => {
        setUpdateHabit(!updateHabit);
    }

    const HandleSubmit = () => {
        CreateHabitInDB(nameRef, descriptionRef)
        setCreateHabit(false)
        AddAlert("success", "Habit Added Successfully");
        ReRender()
    }

    return (
        <Fragment>
            {createHabit && <Fragment>
                <div className="popup-overlay"></div>
                <div className="habits-popup">
                    <div className="Popup">
                        <button onClick={() => setCreateHabit(false)} className="CloseButton"><span className="material-symbols-outlined rotateanim">close</span></button>
                        <div className="header-wrap">
                            <div className="title-wrap">
                                <div className="title">Habit Name</div>
                                <input className="text-input" ref={nameRef} type="text" placeholder="Habit Name..." required />
                            </div>
                        </div>

                        <div className="description">Description:</div>
                        <textarea name="" rows="5" placeholder="Description..." ref={descriptionRef} required></textarea>
                        <button className="Submit" onClick={HandleSubmit}>Add Habit</button>
                    </div>
                </div>
            </Fragment>
            }
            <div className="habits-popup"></div>
            <div className="habits-wrapper">
                <div className="header"><h2>My Habits</h2></div>
                {habits ?
                    <Fragment>
                        {<motion.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }} className="task-list">
                            {habits.map(obj => {
                                console.log(obj)
                                return <Habits key={obj.id} {...obj} reRenderFunction={ReRender} />
                            })}
                        </motion.div>}
                    </Fragment> : <div className="empty">No Habits were created!</div>}


                <motion.button className='Bottom custom-button' onClick={() => { setCreateHabit(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Habit</span></motion.button>
            </div>
        </Fragment>
    )
}

export default HabitsPage;