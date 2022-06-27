import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { Sort } from './filterSlice'

type fetchPizzasArgs = {
  pageCount: number
  category: string
  sort: Sort
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ pageCount, category, sort }: fetchPizzasArgs) => {
    const res = await axios.get<Pizza[]>(
      `https://62afa5f9b0a980a2ef428b6b.mockapi.io/items?page=${pageCount}&limit=4&category=${
        category ? category : ''
      }&sortBy=${sort.property}`
    )
    return res.data as Pizza[]
  }
)

type Pizza = {
  id: string
  name: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

interface PizzaSliceState {
  items: Pizza[]
  status: Status
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: Status.LOADING,
  } as PizzaSliceState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const pizzaSelector = (state: RootState) => state.pizza
export const pizzasSelector = (state: RootState) => state.cart.items

export default pizzaSlice.reducer
export const { setItems } = pizzaSlice.actions
