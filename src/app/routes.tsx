import React from 'react';
import { Route, Routes } from 'react-router-dom';

/*import { AnalyticsPage } from 'features/analytics/ui/AnalyticsPage';*/
import {CategoriesPage} from "../features/categories/ui/CategoriesPage.tsx";
import {TagsPage} from "../features/tags/ui/TagsPage.tsx";
import {ExpensesPage} from "../features/expenses/ui/ExpensesPage.tsx";

export const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<ExpensesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tags" element={<TagsPage />} />
        {/*<Route path="/analytics" element={<AnalyticsPage />} />*/}
    </Routes>
);
