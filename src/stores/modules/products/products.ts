import type { Product } from '@/types/product'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    products: [] as Product[],
    total: 0,
    loading: false,
    error: null,
  },
  getters: {},
})

export default store
