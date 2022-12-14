import './navigation.styles.scss'

import { Link, Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import Sidebar from '../Sidebar/Sidebar.component';
import { motion } from "framer-motion"

const Navigation = () => {
    const { user } = useContext(UserContext)

    const signOutHandler = () => {
        signOutUser();
    }

    return (
        <Fragment>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 100 }} className='navigation'>
                <Link to='/' className='Logo'>CheckList</Link>
                <div className="links">
                    {user ? (<li onClick={signOutHandler}>Signout</li>) : (<Link to='/Login'><li>Sign-In</li></Link>)}
                </div>
            </motion.div>
            {user && <Sidebar />}
            <div className="main-wrapper">
                <Outlet />
            </div>
        </Fragment>
    )
}

export default Navigation;