import { configureStore } from '@reduxjs/toolkit';
// REDUCERS
import filtersReducer from './slices/filtersSlice';
import productsReducer from './slices/productsSlice';

export default configureStore({
  reducer: { filters: filtersReducer, products: productsReducer },
});
