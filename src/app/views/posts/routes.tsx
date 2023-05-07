import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import InfiniteQueries from './components/section-4_infinite-query/infinite';

const PostsIndex = lazy(() => import('./components/section-1_react-query/index'));
const PostsShow = lazy(() => import('./components/section-2_param-query/show'));
const PaginatedQueries = lazy(() => import('./components/section-3_pagination/pagination'));

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<PostsIndex />} />
            <Route path="/query" element={<PostsShow />} />
            <Route path="/pagination" element={<PaginatedQueries />} />
            <Route path="/infinite" element={<InfiniteQueries />} />
            {/* Add more movie-related routes here */}
        </Routes>
    );
};

export default routes;
