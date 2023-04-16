import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const MoviesIndex = lazy(() => import('./components'));
const MovieNew = lazy(() => import('./components/'));

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<MoviesIndex />} />
            <Route path="/new" element={<MovieNew />} />
            {/* Add more movie-related routes here */}
        </Routes>
    );
};

export default routes;
