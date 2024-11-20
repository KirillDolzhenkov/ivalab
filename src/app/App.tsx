import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import {Layout} from "../shared/ui/Layout.tsx";
import './styles/index.less'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <AppRoutes />
            </Layout>
        </BrowserRouter>
    );
};

export default App;
