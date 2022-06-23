import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({pageCount, category, sort}) => {
    const res = await axios.get(
      `https://62afa5f9b0a980a2ef428b6b.mockapi.io/items?page=${pageCount}&limit=4&category=${
        category ? category : ''
      }&sortBy=${sort.property}`
    )
    return res.data
  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'succces'
      state.items = action.payload
    },
    [fetchPizzas.rejected]: state => {
      state.status = 'error'
      state.items = []
    },
  },
})

export default pizzaSlice.reducer
export const { setItems } = pizzaSlice.actions
