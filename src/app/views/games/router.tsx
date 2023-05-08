import { Routes, Route } from 'react-router-dom';
import GameIndex from './components';
import GameIndexReactQuery from './components/index-query';

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<GameIndexReactQuery />} />
        </Routes>
    );
};

export default routes;
