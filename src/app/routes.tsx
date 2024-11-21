import { Route, Routes } from 'react-router-dom';

import { CategoriesPage, NotFoundPage } from '@/pages';
import { TagsPage } from '@/pages';
import { ExpensesPage } from '@/pages';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ExpensesPage />} />
    <Route path="/categories" element={<CategoriesPage />} />
    <Route path="/tags" element={<TagsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
