import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
    id: number;
    name: string;
    description?: string;
}

interface CategoriesState {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: JSON.parse(localStorage.getItem('categories') || '[]'),
};

const slice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
            localStorage.setItem('categories', JSON.stringify(state.categories));
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            state.categories = state.categories.filter((cat) => cat.id !== action.payload);
            localStorage.setItem('categories', JSON.stringify(state.categories));
        },
    },
});

export const categoriesActions = slice.actions;
export const categoriesSlice = slice.reducer;
export const categoriesSelectors = slice.selectors;