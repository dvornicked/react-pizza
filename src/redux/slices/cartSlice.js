import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem.count - 1) {
        findItem.count--
      } else {
        state.items = state.items.filter(item => item !== findItem)
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id)

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = state => state.cart

export default cartSlice.reducer
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions
