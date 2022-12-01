import { Fragment } from "react";
import { Link } from "react-router-dom";

const Dbutton = ({ Name, L, State }) => {
    return (
        <Fragment>
            <Link to={L} className={State ? "active" : null}>{Name}</Link>
        </Fragment >
    )
}

export default Dbutton;