import type { RootState } from '@/stores/type'
import type { Order, OrdersState } from './state'
import type { ActionContext } from 'vuex'

type OrderContext = ActionContext<OrdersState, RootState>

export default {
  setOrders({ commit }: OrderContext, payload: { orders: Order[]; total: number }) {
    commit('SET_ORDERS', payload.orders)
    commit('SET_TOTAL', payload.total)
  },
}
