import type { MutationTree } from 'vuex'
import type { Order, OrdersState } from './state'

const mutations: MutationTree<OrdersState> = {
  SET_ORDERS(state, order: Order[]) {
    state.orders = order
  },
  SET_TOTAL(state, total: number) {
    state.total = total
  },
  SET_KEYWORD(state, keyword: string) {
    state.keyword = keyword
  },
}

export default mutations
