import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// URLs
const BASE_URL = 'http://127.0.0.1:5001/';
const ADMIN_URL = BASE_URL + 'admin/';

export const getProducts = createAsyncThunk(
  'admin/loadProducts',
  async (thunkAPI) => {
    const productsURL = ADMIN_URL + 'products';
    try {
      return await fetch(productsURL).then((res) => res.json());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (product, thunkAPI) => {
    const productsURL = ADMIN_URL + 'products';
    try {
      const response = await fetch(productsURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((res) => res.json());

      if (response.error) {
        return thunkAPI.rejectWithValue(response.message);
      } else {
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const patchProduct = createAsyncThunk(
  'admin/patchProduct',
  async (product, thunkAPI) => {
    const productsURL = ADMIN_URL + 'products/' + product._id;
    try {
      const response = await fetch(productsURL, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((res) => res.json());

      if (response.error) {
        return thunkAPI.rejectWithValue(response.message);
      } else {
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id, thunkAPI) => {
    const productsURL = ADMIN_URL + 'products/' + id;
    try {
      const response = await fetch(productsURL, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      if (response.error) {
        return thunkAPI.rejectWithValue(response.message);
      } else {
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsList: [],
    loading: 'idle',
    alert: null,
  },
  extraReducers: {
    // loadProducts
    [getProducts.pending]: (state, action) => ({
      ...state,
      loading: 'loading',
      alert: null,
    }),
    [getProducts.fulfilled]: (state, action) => ({
      loading: 'success',
      productsList: [...action.payload.products],
      alert: null,
    }),
    [getProducts.rejected]: (state, action) => ({
      ...state,
      loading: 'failed',
      alert: { type: 'error', message: action.payload.data.error },
    }),
    // createProduct
    [createProduct.pending]: (state, action) => ({
      ...state,
      loading: 'loading',
      alert: null,
    }),
    [createProduct.fulfilled]: (state, action) => ({
      loading: 'success',
      productsList: [...state.productsList, action.payload.product],
      alert: {
        type: 'success',
        message: `New Product added: ${action.payload.product._id}`,
      },
    }),
    [createProduct.rejected]: (state, action) => ({
      ...state,
      loading: 'failed',
      alert: { type: 'error', message: action.payload },
    }),
    ////
    // patchProduct
    [patchProduct.pending]: (state, action) => ({
      ...state,
      loading: 'loading',
      alert: null,
    }),
    [patchProduct.fulfilled]: (state, action) => ({
      loading: 'success',
      productsList: [
        ...state.productsList.map((product) => {
          return product.id === action.payload.product._id
            ? action.payload.product
            : product;
        }),
      ],
      alert: {
        type: 'success',
        message: `Product updated: ${action.payload.product._id}`,
      },
    }),
    [patchProduct.rejected]: (state, action) => ({
      ...state,
      loading: 'failed',
      alert: { type: 'error', message: action.payload },
    }),

    ///
    // deleteProduct
    [deleteProduct.pending]: (state, action) => ({
      ...state,
      loading: 'loading',
      alert: null,
    }),
    [deleteProduct.fulfilled]: (state, action) => ({
      loading: 'success',
      productsList: [
        ...state.productsList.filter((product) => {
          return product.id !== action.payload.deleted_product.id;
        }),
      ],
      alert: {
        type: 'success',
        message: `Product deleted: ${action.payload.deleted_product.id}`,
      },
    }),
    [deleteProduct.rejected]: (state, action) => ({
      ...state,
      loading: 'failed',
      alert: { type: 'error', message: action.payload },
    }),
  },
});

export default productsSlice.reducer;
