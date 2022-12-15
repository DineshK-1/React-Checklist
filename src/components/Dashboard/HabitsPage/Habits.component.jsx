import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import { AlertsContext } from "../../../contexts/Alerts.context"
import { Fragment } from "react";
import { DeleteHabitInDB, SetHabitInDB } from "../../../utils/firebase/firebase.utils";
import DateComp from "../TasksPage/task/Date/Date.component";

const Habits = (props) => {
    const [desc, setDesc] = useState(false);
    const [check, setCheck] = useState(props.taskDone);

    const { AddAlert } = useContext(AlertsContext);

    const HandleCheck = () => {
        SetHabitInDB(props.id, check).then(() => {
            setCheck(!check);
            props.reRenderFunction();
        })
    }

    const upVariant = {
        init:{y:100},
        then:{y:0}
    }

    return (
        <Fragment>
            <AnimatePresence>
                <motion.div drag dragConstraints={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    whileTap={{ backgroundColor: "#4E4E50" }}

                    whileHover={{
                        backgroundColor: "#950740"
                    }}

                    className="task">
                    <div className="top">
                        <div className="left">
                            <input type="checkbox" checked={check} onChange={HandleCheck} />
                            <motion.h4 initial="init" animate="then" variants={upVariant} className={check ? 'name done' : 'name'}>{props.name}</motion.h4>
                        </div>
                        <div className="right">
                            <div className="dates">
                                <DateComp date={props.createdDate.seconds} type={"green"} />
                            </div>
                            <div className="buttons">
                                <button className='custom-button' onClick={() => setDesc(!desc)}><span className="material-symbols-outlined md-18">expand_more</span></button>
                                <button className='custom-button' onClick={() => { DeleteHabitInDB(props.id).then(() => { props.reRenderFunction(); AddAlert("success", "Habit Deleted Successfully"); }) }}><span className="material-symbols-outlined md-18">delete</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <AnimatePresence>
                            {desc &&
                                <motion.div initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }} className="desc">
                                    {props.description}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}

export default Habits;