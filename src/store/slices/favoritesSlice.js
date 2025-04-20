import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    toggleFavorite: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites,
  toggleFavorite 
} = favoritesSlice.actions;

export const selectFavoriteItems = (state) => state.favorites.items;
export const selectIsFavorite = (id) => (state) => 
  state.favorites.items.some(item => item.id === id);

export default favoritesSlice.reducer;
