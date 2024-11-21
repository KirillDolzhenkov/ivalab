import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
  id: number;
  name: string;
  description?: string;
}

interface CategoriesState {
  categories: ICategory[];
}

const initialState: CategoriesState = {
  categories: [
    { id: 1, name: 'Продукты', description: 'Еда и напитки' },
    { id: 2, name: 'Машина', description: 'Транспортные расходы' }
  ]
};

export const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    }
  },
  selectors: {
    getCategories: (state) => state.categories
  }
});

export const categoriesActions = slice.actions;
export const categoriesSelectors = slice.selectors;
export const categoriesSlice = slice.reducer;
