/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Spinner from './libs/spinner/spinner';

const Home = lazy(() => import('./views/home'));
const GamesRouter = lazy(() => import('./views/games/router'));
const MoviesRouter = lazy(() => import('./views/movies/routes'));
const PlaygroundRouter = lazy(() => import('./views/playground/routes'));

const RoutingModule = () => {
    return (
        <Fragment>
            <Navbar></Navbar>
            <main className="container-fluid">
                <Suspense fallback={<Spinner color={'primary'} />}>
                    <Routes>
                        <Route path="/games/*" element={<GamesRouter />} />
                        <Route path="/movies/*" element={<MoviesRouter />} />
                        <Route
                            path="/playground/*"
                            element={<PlaygroundRouter />}
                        />

                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </main>
        </Fragment>
    );
};

export default RoutingModule;
