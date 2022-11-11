import './Dashboard.styles.scss'
import Header from './Header/Header.component';
import Task from './task/task.component';

const Dashboard = () => {
    return (
        <div className="my-tasks">
            <h2>My Tasks</h2>
            <div className="tasks-wrapper">
                <Header day="Today" />
                <Task name="Test" />
                <Task name="Test" />
                <Task name="Test" />
            </div>
        </div>
    )
}

export default Dashboard;