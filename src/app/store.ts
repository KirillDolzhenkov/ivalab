import { configureStore } from '@reduxjs/toolkit';
import { expensesSlice } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import { categoriesSlice } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
/*import categoriesReducer from 'features/categories/model/categoriesSlice';
import expensesReducer from 'features/expenses/model/expensesSlice';
import tagsReducer from 'features/tags/model/tagsSlice';*/

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    /*tags: tagsReducer,*/
    expenses: expensesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
