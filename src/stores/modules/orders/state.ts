export interface Order {
  id: number
  tax: number
  total: number
  status: string
}

export interface OrdersState {
  orders: Order[]
  total: number
  keyword: string
}

export const state = (): OrdersState => ({
  orders: [],
  total: 0,
  keyword: '',
})
