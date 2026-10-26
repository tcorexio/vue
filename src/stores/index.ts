import { createStore } from 'vuex'
import type { RootState } from './type'
import products from './modules/products'

const store = createStore<RootState>({
  modules: {
    products,
  },
})

export default store
