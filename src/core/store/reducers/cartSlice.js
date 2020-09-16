import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      let itemRepeated = state.items.find(item => item.id === action.payload.id);
      if (itemRepeated) {
        itemRepeated.quantity = itemRepeated.quantity + 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => {
        return item.id !== action.payload.id;
      });
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const selectItems = state => state.cart.items;
export default cartSlice.reducer;
