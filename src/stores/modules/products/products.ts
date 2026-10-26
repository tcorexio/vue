import type { Product } from '@/views/ProductView.vue'
import { createStore } from 'vuex/types/index.js'

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
