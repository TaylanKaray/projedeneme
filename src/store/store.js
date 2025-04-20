import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
import urunlerReducer from './slices/urunlerSlice';

export const store = configureStore({
  reducer: {
    urunler: urunlerReducer,
    cart: cartReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});
