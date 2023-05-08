/* eslint-disable react/jsx-no-useless-fragment */
import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
    {
        path: '/playground/building-components',
        text: 'Building Components',
    },
    {
        path: 'playground/managing-components-state',
        text: 'Components State',
    },
    {
        dropdown: true,
        text: 'React Query',
        links: [
            {
                path: '/posts',
                text: 'fetch data',
            },
            {
                path: '/posts/query',
                text: 'query Params',
            },
            {
                path: '/posts/pagination',
                text: 'paginated queries',
            },
            {
                path: '/posts/infinite',
                text: 'Infinite Queries',
            },
            {
                path: '/posts/mutation',
                text: 'Mutations',
            },
        ],
    },
    {
        path: '/games',
        text: 'Games',
    },
    {
        path: '/movies',
        text: 'React Http',
    },
    {
        path: '/movies/new',
        text: 'Forms',
    },
];

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const handleDropdownToggle = () => setShowDropdown(!showDropdown);
    const handleToggle = () => setShow(!show);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setShowDropdown(false);
        setShow(false);
    };

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
                        {navLinks.map((link, i) =>
                            link.dropdown ? (
                                <Fragment>
                                    <li
                                        className="nav-item dropdown"
                                        key={link.text}
                                    >
                                        <NavLink
                                            className="nav-link dropdown-toggle text-white"
                                            to="#"
                                            id={`${link.text}-dropdown`}
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={handleDropdownToggle}
                                        >
                                            {link.text}
                                        </NavLink>
                                        <ul
                                            className={`dropdown-menu ${
                                                showDropdown ? 'show' : ''
                                            }`}
                                            aria-labelledby={`${link.text}-dropdown`}
                                        >
                                            {link.links.map((sublink) => (
                                                <li key={sublink.path}>
                                                    <NavLink
                                                        className="dropdown-item"
                                                        to={sublink.path}
                                                        onClick={() =>
                                                            handleLinkClick(
                                                                sublink.path
                                                            )
                                                        }
                                                    >
                                                        {sublink.text}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <li className="nav-item" key={link.path}>
                                        <NavLink
                                            className="nav-link text-white"
                                            to={link.path}
                                            onClick={() =>
                                                handleLinkClick(link.path)
                                            }
                                        >
                                            {link.text}
                                        </NavLink>
                                    </li>
                                </Fragment>
                            )
                        )}
                    </ul>
                    <form className="d-flex ms-3">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-light"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
