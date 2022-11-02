import './navigation.styles.scss'

import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';

const Navigation = () => {
    return (
        <Fragment>
        <div className='navigation'>
            <Link to='/' className='Logo'>CheckList</Link>
            <div className="links">
                <li>Link1</li>
                <li>Link2</li>
                <Link to='/Login'><li>Sign-In</li></Link>
            </div>
        </div>
        <Outlet/>
        </Fragment>
    )
}

export default Navigation;