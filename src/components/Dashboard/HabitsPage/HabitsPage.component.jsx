import "./HabitsPage.styles.scss"

import { motion } from "framer-motion"
import { useState } from "react"

const HabitsPage = () => {
    const [createHabit, setCreateHabit] = useState(false)

    return (
        <div className="habits-wrapper">
            <div className="header"><h2>My Habits</h2></div>
            <div className="empty">No Habits were created!</div>
            
            <motion.button className='Bottom custom-button' onClick={() => { setCreateHabit(true) }}><span className="material-symbols-outlined image">add</span><span className="xdxd">Create Habit</span></motion.button>
        </div>
    )
}

export default HabitsPage;