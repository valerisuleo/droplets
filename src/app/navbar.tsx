import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
    {
        path: '/building-components',
        text: 'Building Components',
    },
    {
        path: '/managing-components-state',
        text: 'Components State',
    },
    {
        path: '/movies',
        text: 'React Http',
    },
    {
        path: '/movies/new',
        text: 'Forms',
    },
    {
        path: '/games',
        text: 'Games',
    },
];

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <nav className="navbar navbar-expand-md navbar-primary bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 text-white">
                    Navbar
                </span>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleToggle}
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse justify-content-end ${
                        show ? 'show' : ''
                    }`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        {navLinks.map((link) => (
                            <li className="nav-item" key={link.path}>
                                <NavLink
                                    className="nav-link text-white"
                                    to={link.path}
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
