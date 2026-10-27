import type { Order, OrdersState } from './state'

export default {
  allOrders: (state: OrdersState): Order[] => state.orders,

  totalOrders: (state: OrdersState): number => state.total,

  orderCount: (state: OrdersState): number => state.orders.length,

  searchResults: (state: OrdersState): Order[] => {
    const keyword = state.keyword.trim().toLowerCase()

    return state.orders.filter((order) => {
      const matchKeyword = !keyword || order.status.toLocaleLowerCase().includes(keyword)

      return matchKeyword
    })
  },

  getOrderById:
    (state: OrdersState) =>
    (id: number): Order | undefined =>
      state.orders.find((order) => order.id === id),
}
