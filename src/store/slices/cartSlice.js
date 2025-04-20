import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, adet = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.adet += adet;
      } else {
        state.items.push({ ...action.payload, adet });
      }

      state.total = state.items.reduce((total, item) => 
        total + (item.fiyat * item.adet), 0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => 
        total + (item.fiyat * item.adet), 0
      );
    },
    updateQuantity: (state, action) => {
      const { id, adet } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.adet = Math.max(0, adet);
        if (item.adet === 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
        state.total = state.items.reduce((total, item) => 
          total + (item.fiyat * item.adet), 0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.items.reduce((count, item) => count + item.adet, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
