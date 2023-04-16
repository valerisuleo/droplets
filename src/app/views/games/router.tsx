import { Routes, Route } from 'react-router-dom';
import GameIndex from './components';

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<GameIndex />} />
        </Routes>
    );
};

export default routes;
