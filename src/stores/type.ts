import type { OrdersState } from './modules/orders/state'
import type { ProductsState } from './modules/products/state'

export interface RootState {
  products: ProductsState
  orders: OrdersState
}
