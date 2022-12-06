import "./HabitsPage.styles.scss"

import { motion } from "framer-motion"
import { useState } from "react"
import { Fragment } from "react"

const HabitsPage = () => {
    const [createHabit, setCreateHabit] = useState(false)

    return (
        <Fragment>
            {createHabit &&
                <div className="habits-popup">
                    
                </div>
            }
            <div className="habits-popup"></div>
            <div className="habits-wrapper">
                <div className="header"><h2>My Habits</h2></div>
                <div className="empty">No Habits were created!</div>

                <motion.button className='Bottom custom-button' onClick={() => { setCreateHabit(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Habit</span></motion.button>
            </div>
        </Fragment>
    )
}

export default HabitsPage;