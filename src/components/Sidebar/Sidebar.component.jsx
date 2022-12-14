import "./Sidebar.styles.scss"
import Dbutton from "./DropdownButton/DButton.component"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Dbutton Name="Habits" L="Dashboard/Habits" State={false} />
            <Dbutton Name="Tasks" L="Dashboard/Tasks" State={false} />
        </div>
    )
}

export default Sidebar;