import { createStore } from 'vuex'
import type { RootState } from './type'
import products from './modules/products'
import orders from './modules/orders'

const store = createStore<RootState>({
  modules: {
    products,
    orders,
  },
})

export default store
