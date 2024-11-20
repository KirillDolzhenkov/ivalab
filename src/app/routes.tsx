import { Route, Routes } from 'react-router-dom';

/*import { AnalyticsPage } from 'features/analytics/ui/AnalyticsPage';*/
import { CategoriesPage } from '../pages/CategoriesPage/ui/CategoriesPage.tsx';
import { TagsPage } from '../pages/TagsPage/ui/TagsPage.tsx';
import { ExpensesPage } from '../pages/ExpensesPage/ui/ExpensesPage.tsx';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ExpensesPage />} />
    <Route path="/expenses" element={<ExpensesPage />} />
    <Route path="/categories" element={<CategoriesPage />} />
    <Route path="/tags" element={<TagsPage />} />
    {/*<Route path="/analytics" element={<AnalyticsPage />} />*/}
  </Routes>
);
