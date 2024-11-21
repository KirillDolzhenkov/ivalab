import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITag {
  id: number;
  name: string;
  color: string;
}

interface TagsState {
  tags: ITag[];
}

const initialState: TagsState = {
  tags: [
    { id: 1, name: 'Работа', color: '#ff0000' },
    { id: 2, name: 'Отдых', color: '#ff0000' }
  ]
};

export const slice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tags.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<ITag>) => {
      const index = state.tags.findIndex((tag) => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
    }
  },
  selectors: {
    getTags: (state) => state.tags,
    getTagByName: (state) => (tagName: string) => state.tags.find((tag) => tag.name === tagName)
  }
});

export const tagsActions = slice.actions;
export const tagsSlice = slice.reducer;
export const tagsSelectors = slice.selectors;
