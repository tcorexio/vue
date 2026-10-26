import type { MutationTree } from 'vuex'
import type { Product, ProductsState } from './state'

const mutations: MutationTree<ProductsState> = {
  SET_PRODUCTS(state, products: Product[]) {
    state.products = products
  },
  SET_TOTAL(state, total: number) {
    state.total = total
  },
  SET_KEYWORD(state, keyword: string) {
    state.keyword = keyword
  },
  SET_CATEGORY(state, category: string) {
    state.selectedCategory = category
  },
}

export default mutations