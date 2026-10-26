export interface Category {
  id: number
  name: string
}

export interface Product {
  id: number
  sku: string
  name: string
  slug: string
  category: Category | null
}

export interface ProductsState {
  products: Product[]
  total: number
  keyword: string
  selectedCategory: string
}

export const state = (): ProductsState => ({
  products: [],
  total: 0,
  keyword: '',
  selectedCategory: 'All',
})
