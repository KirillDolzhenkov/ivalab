import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadFromLocalStorage } from '@/app/loadFromLocalStorage.ts';

export interface ITag {
  id: string;
  name: string;
  color: string;
}

interface TagsState {
  tags: ITag[];
}

const initialState: TagsState = {
  tags: loadFromLocalStorage('tags', [])
};

export const slice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<Omit<ITag, 'id'>>) => {
      const newTag: ITag = {
        ...action.payload,
        id: uuidv4()
      };
      state.tags.push(newTag);
    },
    updateTag: (state, action: PayloadAction<ITag>) => {
      const index = state.tags.findIndex((tag) => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((tag) => tag.id !== action.payload);
    }
  },
  selectors: {
    getTags: (state) => state.tags,
    getTagByName: (state) => (tagName: string) => state.tags.find((tag) => tag.name === tagName)
  }
});

export const tagsThunks = {};
export const tagsActions = slice.actions;
export const tagsSlice = slice.reducer;
export const tagsSelectors = slice.selectors;
