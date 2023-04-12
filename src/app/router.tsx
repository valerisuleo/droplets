/* eslint-disable react/jsx-no-useless-fragment */
import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import BuildingComponents from './views/building-components';
import Home from './views/home';
import ManagingComponentsState from './views/managing-components-state';
import MoviesIndex from './views/movies/movies-index';
import GameIndex from './views/games';
import MovieNew from './views/movies/movie-new';

const RoutingModule = () => {
    return (
        <Fragment>
            <Navbar></Navbar>
            <main className="container">
                <Routes>
                    <Route
                        path="/home"
                        Component={GameIndex}
                    />
                    <Route
                        path="/movies/new"
                        Component={MovieNew}
                    />
                    <Route
                        path="/movies"
                        Component={MoviesIndex}
                    />
                    <Route
                        path="/managing-components-state"
                        Component={ManagingComponentsState}
                    />
                    <Route
                        path="/building-components"
                        Component={BuildingComponents}
                    />
                    <Route path="/" Component={Home} />
                </Routes>
            </main>
        </Fragment>
    );
};

export default RoutingModule;
