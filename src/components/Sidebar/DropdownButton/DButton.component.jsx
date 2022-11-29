import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion"

const Dbutton = ({ Name, L, State, List }) => {
    const [open, setOpen] = useState(false);

    const HandleClick = () => {
        setOpen(!open);
    }

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }

    return (
        <Fragment>
            <Link to={L} className={State ? "active" : null}><motion.span animate={{rotate:open?0:-90}}className="material-symbols-outlined" onClick={HandleClick}>expand_more</motion.span>{Name}</Link>
            <motion.div animate={open ? "open" : "closed"}
                variants={variants}>
                {List && open ?
                    <div className="List">
                        {List.map((element) => {
                            return <Link key={element.id} to={element.L} className={State ? "active elem" : "elem"}>{element.Name}</Link>
                        })}
                    </div> : null}
            </motion.div>
        </Fragment >
    )
}

export default Dbutton;