import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IExpense {
    id: number
    date: string;
    category: string;
    description?: string;
    tags?: string[];
    amount: number;
}

interface ExpensesState {
    expenses: IExpense[];
}

/*const initialState: ExpensesState = {
    expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
};*/

const initialState: ExpensesState = {
    expenses: [
        { id: 1, date: '17.11.2024', category: 'Машина', description: 'Зарезка', amount: 85.45 },
        { id: 2, date: '17.11.2024', category: 'Продукты', amount: 16.87 },
        { id: 3, date: '17.11.2024', category: 'Продукты', description: 'Молосо, хлеб', amount: 16.87 },
        { id: 4, date: '18.11.2024', category: 'Продукты', amount: 12 },
        { id: 5, date: '18.11.2024', category: 'Машина', description: 'Избог машины', amount: 15.5 },
        { id: 6, date: '18.11.2024', category: 'Кафе', amount: 50 },
        { id: 11, date: '17.11.2024', category: 'Машина', description: 'Зарезка', amount: 85.45 },
        { id: 12, date: '17.11.2024', category: 'Продукты', amount: 16.87 },
        { id: 13, date: '17.11.2024', category: 'Продукты', description: 'Молосо, хлеб', amount: 16.87 },
        { id: 14, date: '18.11.2024', category: 'Продукты', amount: 12 },
        { id: 15, date: '18.11.2024', category: 'Машина', description: 'Избог машины', amount: 15.5 },
        { id: 16, date: '18.11.2024', category: 'Кафе', amount: 50 },
        { id: 21, date: '17.11.2024', category: 'Машина', description: 'Зарезка', amount: 85.45 },
        { id: 22, date: '17.11.2024', category: 'Продукты', amount: 16.87 },
        { id: 23, date: '17.11.2024', category: 'Продукты', description: 'Молосо, хлеб', amount: 16.87 },
        { id: 24, date: '18.11.2024', category: 'Продукты', amount: 12 },
        { id: 25, date: '18.11.2024', category: 'Машина', description: 'Избог машины', amount: 15.5 },
        { id: 26, date: '18.11.2024', category: 'Кафе', amount: 50 },
        { id: 211, date: '17.11.2024', category: 'Машина', description: 'Зарезка', amount: 85.45 },
        { id: 212, date: '17.11.2024', category: 'Продукты', amount: 16.87 },
        { id: 213, date: '17.11.2024', category: 'Продукты', description: 'Молосо, хлеб', amount: 16.87 },
        { id: 214, date: '18.11.2024', category: 'Продукты', amount: 12 },
        { id: 215, date: '18.11.2024', category: 'Машина', description: 'Избог машины', amount: 15.5 },
        { id: 216, date: '18.11.2024', category: 'Кафе', amount: 50 },
    ],
};

export const slice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<IExpense>) => {
            state.expenses.push(action.payload);
        },
    },
    selectors: {
        getExpenses: (state) => state.expenses,
    },
});

export const expensesActions = slice.actions;
export const expensesSlice = slice.reducer;
export const expensesSelectors = slice.selectors;