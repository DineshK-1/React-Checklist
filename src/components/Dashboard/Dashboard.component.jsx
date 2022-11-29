import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.styles.scss'

const Dashboard = () => {
    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    )
}

export default Dashboard;