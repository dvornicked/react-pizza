import { createSlice } from '@reduxjs/toolkit'

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
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount)
      state.category = Number(action.payload.category)
      state.sort = action.payload.sort
    },
  },
})

export default filterSlice.reducer
export const { setCategory, setSort, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions
