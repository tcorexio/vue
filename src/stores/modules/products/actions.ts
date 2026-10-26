import type { ActionContext } from 'vuex'
import type { ProductsState, Product } from './state'
import type { RootState } from '../../type'

type ProductContext = ActionContext<ProductsState, RootState>

export default {
  setProducts({ commit }: ProductContext, payload: { products: Product[]; total: number }) {
    commit('SET_PRODUCTS', payload.products)
    commit('SET_TOTAL', payload.total)
  },
}
