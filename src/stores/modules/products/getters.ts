import type { ProductsState, Product } from './state'

export default {
  // 1. Danh sách sản phẩm đang có trong state
  allProducts: (state: ProductsState): Product[] => state.products,

  // 2. Tổng số sản phẩm do API trả về
  totalProducts: (state: ProductsState): number => state.total,

  // 3. Số sản phẩm thực sự đang được tải
  productCount: (state: ProductsState): number => state.products.length,

  // 4. Lấy danh sách category không trùng
  productCategories: (state: ProductsState): string[] => {
    const categories = state.products
      .map((product) => product.category?.name)
      .filter((name): name is string => Boolean(name))

    return [...new Set(categories)]
  },

  // 5. Lọc theo category đã chọn
  productsByCategory: (state: ProductsState): Product[] => {
    if (state.selectedCategory === 'All') {
      return state.products
    }

    return state.products.filter((product) => product.category?.name === state.selectedCategory)
  },

  // 6. Tìm theo tên sản phẩm hoặc SKU
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

  // 7. Tìm sản phẩm theo ID
  getProductById:
    (state: ProductsState) =>
    (id: number): Product | undefined =>
      state.products.find((product) => product.id === id),
}
