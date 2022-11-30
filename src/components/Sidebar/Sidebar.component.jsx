import "./Sidebar.styles.scss"
import Dbutton from "./DropdownButton/DButton.component"

const Sidebar = () => {
    const Tasks = [
        {
            id:1,
            Name:"Today",
            L:"Dashboard/Tasks?q=Today",
        },
        {
            id:2,
            Name:"Tommorow",
            L:"Dashboard/Tasks?q=Tommorow",
        },
        {
            id:3,
            Name:"Upcoming",
            L:"Dashboard/Tasks?q=Upcoming",
        },
    ]

    const Habits = [
        {
            id:1,
            Name:"Today",
            L:"Dashboard/Habits?q=Today",
        },
    ]

    return (
        <div className="sidebar">
            <Dbutton Name="Habits" L="Dashboard/Tasks" State={false} List = {Habits}/>
            <Dbutton Name="Tasks" L="Dashboard/Tasks" State={false} List = {Tasks}/>
            <Dbutton Name="Lists" L="Dashboard/Tasks" State={false} />
        </div>
    )
}

export default Sidebar;