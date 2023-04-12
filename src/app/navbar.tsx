import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div>
                    <span className='me-3'>
                        <NavLink to={'/building-components'}>
                            Building Components
                        </NavLink>
                    </span>
                    <span className='me-3'>
                        <NavLink to={'/managing-components-state'}>
                            Managing Components State
                        </NavLink>
                    </span>
                    <span className='me-3'>
                        <NavLink to={'/movies'}>
                            React Http
                        </NavLink>
                    </span>
                    <span className='me-3'>
                        <NavLink to={'/movies/new'}>
                            Forms
                        </NavLink>
                    </span>
                    <span className='me-3'>
                        <NavLink to={'/home'}>
                            home
                        </NavLink>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
