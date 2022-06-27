import { calcTotalPrice } from './calcTotalPrice'

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  return {
    items,
    totalPrice: calcTotalPrice(items),
  }
}
