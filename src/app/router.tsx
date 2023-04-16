/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Spinner from './libs/spinner/spinner';

const BuildingComponents = lazy(
    () => import('./views/playground/building-components')
);
const Home = lazy(() => import('./views/home'));
const ManagingComponentsState = lazy(
    () => import('./views/playground/managing-components-state')
);
const MoviesIndex = lazy(
    () => import('./views/movies/components/movies-index')
);
const GameIndex = lazy(() => import('./views/games'));
const MovieNew = lazy(() => import('./views/movies/components/movie-new'));

const RoutingModule = () => {
    return (
        <Fragment>
            <Navbar></Navbar>
            <main className="container-fluid">
                <Suspense fallback={<Spinner color={'primary'} />}>
                    <Routes>
                        <Route path="/games" Component={GameIndex} />
                        <Route path="/movies/new" Component={MovieNew} />
                        <Route path="/movies" Component={MoviesIndex} />
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
                </Suspense>
            </main>
        </Fragment>
    );
};

export default RoutingModule;
