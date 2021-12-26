import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// URLs
const BASE_URL = 'http://127.0.0.1:5001/';
const ADMIN_URL = BASE_URL + 'admin/';

export const getFilters = createAsyncThunk(
  'admin/loadFilters',
  async (thunkAPI) => {
    const filtersURL = ADMIN_URL + 'filters';
    try {
      return await fetch(filtersURL).then((res) => res.json());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createFilter = createAsyncThunk(
  'admin/createFilter',
  async (filter, thunkAPI) => {
    const filtersURL = ADMIN_URL + 'filters';
    try {
      const response = await fetch(filtersURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filter),
      }).then((res) => res.json());

      if (response.error) {
        return thunkAPI.rejectWithValue(
          response.message /*'Duplicate variant'*/
        );
      } else {
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filterTypes: [],
    filterList: [],
    loading: 'idle',
    alert: null,
  },
  extraReducers: {
    // loadFilters
    [getFilters.pending]: (state, action) => ({
      ...state,
      loading: 'loading',
      alert: null,
    }),
    [getFilters.fulfilled]: (state, action) => ({
      loading: 'success',
      filterTypes: [
        ...new Set(action.payload.filters.map((item) => item.type)),
      ].sort((a, b) => (a > b ? 1 : -1)),
      filterList: [...action.payload.filters],
      alert: null,
    }),
    [getFilters.rejected]: (state, action) => ({
      ...state,
      loading: 'failed',
      alert: { type: 'error', message: action.payload.data.error },
    }),
    // createFilter
    [createFilter.pending]: (state, action) => ({
      ...state,
      loading: 'loading',
      alert: null,
    }),
    [createFilter.fulfilled]: (state, action) => ({
      loading: 'success',
      filterTypes: [
        ...new Set([...state.filterTypes, action.payload.filter.type]),
      ].sort((a, b) => (a > b ? 1 : -1)),
      filterList: [...state.filterList, action.payload.filter],
      alert: {
        type: 'success',
        message: `New filter added: ${JSON.stringify({
          type: action.payload.filter.type,
          variant: action.payload.filter.variant,
        })}`,
      },
    }),
    [createFilter.rejected]: (state, action) => ({
      ...state,
      loading: 'failed',
      alert: { type: 'error', message: action.payload },
    }),
  },
});

export default filtersSlice.reducer;
