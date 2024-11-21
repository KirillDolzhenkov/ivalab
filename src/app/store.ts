import { configureStore } from '@reduxjs/toolkit';
import { expensesSlice } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import { categoriesSlice } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import { tagsSlice } from '@/pages/TagsPage/model/TagsSlice.ts';
import { localStorageMiddleware } from '@/app/localStorageMiddleware.ts';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    tags: tagsSlice,
    expenses: expensesSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
