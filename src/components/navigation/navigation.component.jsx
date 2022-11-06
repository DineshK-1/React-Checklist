import './navigation.styles.scss'

import { Link, Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    const { user, setCurrentUser, databaseUser } = useContext(UserContext);

    console.log(databaseUser);
    
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
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