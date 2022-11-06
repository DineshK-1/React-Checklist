import './navigation.styles.scss'

import { Link, Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

const Navigation = () => {
    const { user } = useContext(UserContext)

    const signOutHandler = () => {
        signOutUser();
    }

    return (
        <Fragment>
            <div className='navigation'>
                <Link to='/' className='Logo'>CheckList</Link>
                <div className="links">
                    <li>Link1</li>
                    <li>Link2</li>
                    {user ? (<li onClick={signOutHandler}>Signout</li>) : (<Link to='/Login'><li>Sign-In</li></Link>)}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;