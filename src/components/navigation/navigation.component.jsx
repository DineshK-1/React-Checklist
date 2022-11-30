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
                    <li>Link1</li>
                    <li>Link2</li>
                    {user ? (<li onClick={signOutHandler}>Signout</li>) : (<Link to='/Login'><li>Sign-In</li></Link>)}
                </div>
            </motion.div>
            {user && <Sidebar />}
            <Outlet />
        </Fragment>
    )
}

export default Navigation;