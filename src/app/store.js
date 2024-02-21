import { configureStore } from '@reduxjs/toolkit';
import DiscriptionSlice from '../Features/AddToDiscription/DiscriptionSlice'
import CartSlice from '../Features/AddToCart/CartSlice';

export const store = configureStore({
  reducer: {
    products:DiscriptionSlice,
    cart:CartSlice,
  }
});

