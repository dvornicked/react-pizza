import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartLS'
import { RootState } from '../store'

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: number
  size: number
  count: number
}

interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}

const cartData = getCartFromLS()

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: cartData.totalPrice,
    items: cartData.items,
  } as CartSliceState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem && findItem.count - 1) {
        findItem.count--
      } else {
        state.items = state.items.filter(item => item !== findItem)
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
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



export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions
