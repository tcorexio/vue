import type { ProductsState, Product } from './state'

export default {
  allProducts: (state: ProductsState): Product[] => state.products,

  totalProducts: (state: ProductsState): number => state.total,

  productCount: (state: ProductsState): number => state.products.length,

  productCategories: (state: ProductsState): string[] => {
    const categories = state.products
      .map((product) => product.category?.name)
      .filter((name): name is string => Boolean(name))

    return [...new Set(categories)]
  },

  productsByCategory: (state: ProductsState): Product[] => {
    if (state.selectedCategory === 'All') {
      return state.products
    }

    return state.products.filter((product) => product.category?.name === state.selectedCategory)
  },

  searchResults: (state: ProductsState): Product[] => {
    const keyword = state.keyword.trim().toLowerCase()

    return state.products.filter((product) => {
      const matchKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.sku.toLowerCase().includes(keyword)

      const matchCategory =
        state.selectedCategory === 'All' || product.category?.name === state.selectedCategory

      return matchKeyword && matchCategory
    })
  },

  getProductById:
    (state: ProductsState) =>
    (id: number): Product | undefined =>
      state.products.find((product) => product.id === id),
}
