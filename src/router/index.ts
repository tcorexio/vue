import ProductView from '@/views/products/ProductView.vue'
import ProductDetailView from '@/views/products/ProductDetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PracticeView from '@/views/practice/PracticeView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import OrdersView from '@/views/orders/OrdersView.vue'
import CartView from '@/views/carts/CartView.vue'
import CartsView from '@/views/carts/CartsView.vue'
import CategoriesView from '@/views/categories/CategoriesView.vue'
import CategoryView from '@/views/categories/CategoryView.vue'
import CustomerView from '@/views/customers/CustomerView.vue'
import CustomersView from '@/views/customers/CustomersView.vue'
import InventoryView from '@/views/inventory/InventoryView.vue'
import InventoryLevelView from '@/views/inventory/InventoryLevelView.vue'
import OrderView from '@/views/orders/OrderView.vue'
import OrderItemView from '@/views/orders/OrderItemView.vue'
import OrderItemsView from '@/views/orders/OrderItemsView.vue'
import ProductResourceView from '@/views/products/ProductResourceView.vue'
import ProductsResourceView from '@/views/products/ProductsResourceView.vue'
import ReviewView from '@/views/reviews/ReviewView.vue'
import ReviewsView from '@/views/reviews/ReviewsView.vue'
import VersionView from '@/views/system/VersionView.vue'
import WarehouseView from '@/views/warehouses/WarehouseView.vue'
import WarehousesView from '@/views/warehouses/WarehousesView.vue'
import WritesView from '@/views/system/WritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: DashboardView,
    },
    { path: '/products', name: 'products-list', component: ProductView },
    { path: '/orders', name: 'orders', component: OrdersView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/carts', name: 'carts', component: CartsView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/category', name: 'category', component: CategoryView },
    { path: '/customer', name: 'customer', component: CustomerView },
    { path: '/customers', name: 'customers', component: CustomersView },
    { path: '/inventory', name: 'inventory', component: InventoryView },
    { path: '/inventory-level', name: 'inventory-level', component: InventoryLevelView },
    { path: '/order', name: 'order', component: OrderView },
    { path: '/order-item', name: 'order-item', component: OrderItemView },
    { path: '/order-items', name: 'order-items', component: OrderItemsView },
    { path: '/product', name: 'product', component: ProductResourceView },
    { path: '/products-feature', name: 'products-feature', component: ProductsResourceView },
    { path: '/review', name: 'review', component: ReviewView },
    { path: '/reviews', name: 'reviews', component: ReviewsView },
    { path: '/version', name: 'version', component: VersionView },
    { path: '/warehouse', name: 'warehouse', component: WarehouseView },
    { path: '/warehouses', name: 'warehouses', component: WarehousesView },
    { path: '/writes', name: 'writes', component: WritesView },
    {
      path: '/practice',
      name: 'practice',
      component: PracticeView,
    },
    { path: '/products/new', name: 'product-new', component: ProductDetailView },
    { path: '/products/:id/edit', name: 'product-edit', component: ProductDetailView },
  ],
})

export default router
