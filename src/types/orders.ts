export type PAYMENT_METHOD = 'cash' | 'debit card' | 'credit card'

export type SHIPPING_METHOD = 'standard'

export interface Order {
  id: string
  notes: string
  created_at: Date
  currency: 'USD'
  customer_id: number
  delivered_at: Date
  discount: number
  paid_at: Date
  payment_method: PAYMENT_METHOD
  placed_at: Date
  shipped_at: Date
  shipping: number
  shipping_address: ShippingAddress
  shipping_method: SHIPPING_METHOD
  subtotal: number
  tax: number
  total: number
  tracking_number: number | null
  updated_at: Date
}

export interface ShippingAddress {
  line1: string
  city: string
  region: string
  postal_code: string
  country: string
}
