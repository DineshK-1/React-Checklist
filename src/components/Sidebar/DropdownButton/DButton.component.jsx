import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion"

const Dbutton = ({ Name, L, State }) => {
    const [open, setOpen] = useState(false);

    const HandleClick = () => {
        setOpen(!open);
    }

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -50 },
    }

    return (
        <Fragment>
            <Link to={L} className={State ? "active" : null}><motion.span animate={{ rotate: open ? 0 : -90 }} className="material-symbols-outlined" onClick={HandleClick}>expand_more</motion.span>{Name}</Link>
        </Fragment >
    )
}

export default Dbutton;