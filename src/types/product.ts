export type ProductStatus = 'active' | 'draft' | 'archived'

export interface Product {
  id: number
  created_at?: string
  updated_at?: string
  sku: string
  name: string
  slug?: string | null
  description?: string | null
  category_id: number
  category?: { id: number; name: string } | null
  brand?: string | null
  price: number
  compare_at_price?: number | null
  currency?: string | null
  color?: string | null
  weight_g?: number | null
  tags?: unknown
  in_stock?: boolean | null
  rating?: number | null
  review_count?: number | null
  status?: ProductStatus | null
}
