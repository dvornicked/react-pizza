import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'



export type Sort = {
  name: string
  property: string
}

interface FilterSliceState {
  searchValue: string
  category: number
  pageCount: number
  sort: Sort
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchValue: '',
    category: 0,
    pageCount: 1,
    sort: {
      name: 'популярности',
      property: 'rating',
    },
  } as FilterSliceState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount)
      state.category = Number(action.payload.category)
      state.sort = action.payload.sort
    },
  },
})

export const filterSelect = (state: RootState) => state.filter

export const sortSelect = (state: RootState) => state.filter.sort

export default filterSlice.reducer
export const {
  setCategory,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions
