import ProductView from '@/views/ProductView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PracticeView from '@/views/PracticeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductView,
    },
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
