import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadFromLocalStorage } from '@/app/loadFromLocalStorage.ts';

export interface IExpense {
  id: string;
  date: string;
  category: string;
  description?: string;
  tags?: string[];
  amount: number;
}

interface ExpensesState {
  expenses: IExpense[];
}

const initialState: ExpensesState = {
  expenses: loadFromLocalStorage('expenses', [])
};

export const slice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<IExpense, 'id'>>) => {
      const newExpense: IExpense = {
        ...action.payload,
        id: uuidv4()
      };
      state.expenses.push(newExpense);
    },
    updateExpense: (state, action: PayloadAction<IExpense>) => {
      const index = state.expenses.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    updateCategoryInExpenses: (state, action: PayloadAction<{ oldCategoryName: string; newCategoryName: string }>) => {
      const { oldCategoryName, newCategoryName } = action.payload;
      state.expenses.forEach((expense) => {
        if (expense.category === oldCategoryName) {
          expense.category = newCategoryName;
        }
      });
    },
    updateTagInExpenses: (state, action: PayloadAction<{ oldTagName: string; newTagName: string }>) => {
      const { oldTagName, newTagName } = action.payload;
      state.expenses.forEach((expense) => {
        if (expense.tags) {
          expense.tags = expense.tags.map((tag) => (tag === oldTagName ? newTagName : tag));
        }
      });
    }
  },
  selectors: {
    getExpenses: (state) => state.expenses
  }
});

export const expensesActions = slice.actions;
export const expensesSlice = slice.reducer;
export const expensesSelectors = slice.selectors;
