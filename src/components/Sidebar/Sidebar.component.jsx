import { Link, useLocation } from "react-router-dom";
import "./Sidebar.styles.scss"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="Dashboard/Tasks" className="active">Tasks</Link>
            <Link to="Dashboard/Tasks" >Item 1</Link>
            <Link to="Dashboard/Tasks" >Item 2</Link>
            <Link to="Dashboard/Tasks" >Item 3</Link>
            <Link to="Dashboard/Tasks" >Item 4</Link>
        </div>
    )
}

export default Sidebar;