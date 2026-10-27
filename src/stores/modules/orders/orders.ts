import { createStore } from 'vuex'
import type { Order } from '@/types/orders'

const store = createStore({
  state: {
    orders: [] as Order[],
    total: 0,
    loading: false,
    error: null,
  },
  getters: {},
})

export default store
