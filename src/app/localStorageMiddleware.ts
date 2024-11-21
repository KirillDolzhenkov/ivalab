import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action); // Передаём действие дальше, чтобы обновить состояние.

  const state = storeAPI.getState();

  try {
    localStorage.setItem('expenses', JSON.stringify(state.expenses.expenses));
    localStorage.setItem('categories', JSON.stringify(state.categories.categories));
    localStorage.setItem('tags', JSON.stringify(state.tags.tags));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }

  return result;
};
