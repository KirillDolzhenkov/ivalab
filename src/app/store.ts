import { configureStore } from '@reduxjs/toolkit';
import { expensesSlice } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import { categoriesSlice } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import { tagsSlice } from '@/pages/TagsPage/model/TagsSlice.ts';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    tags: tagsSlice,
    expenses: expensesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
