import { Routes, Route } from 'react-router-dom';
import BuildingComponents from './building-components';
import ManagingComponentsState from './managing-components-state';

const routes = () => {
    return (
        <Routes>
            <Route
                path="/building-components"
                element={<BuildingComponents />}
            />
            <Route
                path="/managing-components-state"
                element={<ManagingComponentsState />}
            />
        </Routes>
    );
};

export default routes;
