<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_PRODUCTS } from '@/graphql/products/queries'

const keyword = ref('')
const page = ref(1)
const limit = 12

const { result, loading, error, refetch } = useQuery(GET_PRODUCTS, () => ({
  limit,
  page: page.value,
  q: keyword.value || undefined,
}))

const products = ref<any[]>([])
const total = ref(0)

watch(
  result,
  (value) => {
    products.value = value?.products?.data ?? []
    total.value = value?.products?.total ?? 0
  },
  { immediate: true },
)
</script>
<template>
  <div>
    <div>
      <h2>Product</h2>
      <span> Manage inventory, pricing and availability across your store </span>
    </div>

    <div>
      <button>Export</button>
      <button>+ Add product</button>
    </div>

    <div>
      <div>
        <span>TOTAL PRODUCTS</span>
        <div>1,248</div>
        <div>
          <span>+4.2%</span>
          <span>Last 7days</span>
        </div>
      </div>
      <div>
        <span>TOTAL REVENUE</span>
        <div>$ 1,248</div>
        <div>
          <span>+4.2%</span>
          <span>Last 7days</span>
        </div>
      </div>
      <div>
        <span>TOTAL ORDERS</span>
        <div>1,248</div>
        <div>
          <span>+4.2%</span>
          <span>Last 7days</span>
        </div>
      </div>
      <div>
        <span>CUSTOMERS</span>
        <div>1,248</div>
        <div>
          <span>+4.2%</span>
          <span>Last 7days</span>
        </div>
      </div>
    </div>

    <div>
      <div>
        <input v-model="keyword" type="text" placeholder="Search by product name or ID" />
      </div>

      <div>
        <span>All</span>
        <span>Active</span>
        <span>Drafts</span>
        <span>Archived</span>
      </div>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th><checkbox></checkbox></th>
            <th>Product Name</th>
            <th>ID & Create Date</th>
            <th>Price</th>
            <th>Stick</th>
            <th>Status</th>
          </tr>
        </thead>

        <p v-if="loading">Đang tải sản phẩm</p>

        <p v-else-if="error">Không thể tải sản phẩm {{ error.message }}</p>

        <tbody v-else>
          <tr v-for="product in products" v-bind:key="product.id">
            <td><checkbox></checkbox></td>
            <td>{{ product.name }}</td>
            <td>{{ product.slug }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ 120 }}</td>
            <td>Published</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
