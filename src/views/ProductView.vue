<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_PRODUCTS } from '@/graphql/products/queries'

interface Product {
  id: number
  sku: string
  name: string
  slug: string
  category?: {
    name: string
  } | null
}

const keyword = ref('')
const page = ref(1)
const limit = 12

const { result, loading, error } = useQuery(GET_PRODUCTS, () => ({
  limit,
  page: page.value,
  q: keyword.value || undefined,
}))

const products = ref<Product[]>([])
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
  <main class="products-page">
    <section class="page-heading">
      <div>
        <p class="eyebrow">CATALOG / INVENTORY</p>
        <h1>Products</h1>
        <p class="heading-copy">Manage inventory, pricing and availability across your store.</p>
      </div>
      <div class="heading-actions">
        <button class="button button-secondary" type="button">
          <span class="button-icon">↓</span>
          Export
        </button>
        <button class="button button-primary" type="button">
          <span class="button-icon">+</span>
          Add product
        </button>
      </div>
    </section>

    <section class="stats-grid" aria-label="Store overview">
      <article class="stat-card stat-card-highlight">
        <div class="stat-icon purple">◈</div>
        <div>
          <p>Total products</p>
          <strong>{{ total.toLocaleString() }}</strong>
          <span class="stat-change">↗ 4.2% <small>vs last 7 days</small></span>
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-icon green">$</div>
        <div>
          <p>Total revenue</p>
          <strong>$24,860</strong>
          <span class="stat-change">↗ 8.1% <small>vs last 7 days</small></span>
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-icon orange">▣</div>
        <div>
          <p>Total orders</p>
          <strong>1,248</strong>
          <span class="stat-change">↗ 3.6% <small>vs last 7 days</small></span>
        </div>
      </article>
      <article class="stat-card">
        <div class="stat-icon blue">♙</div>
        <div>
          <p>Customers</p>
          <strong>842</strong>
          <span class="stat-change">↗ 5.4% <small>vs last 7 days</small></span>
        </div>
      </article>
    </section>

    <section class="products-card">
      <div class="table-toolbar">
        <div>
          <h2>
            All products <span>{{ total.toLocaleString() }}</span>
          </h2>
          <p>Keep track of your products and their details.</p>
        </div>
        <label class="search-box">
          <span aria-hidden="true">⌕</span>
          <input v-model="keyword" type="search" placeholder="Search products..." />
        </label>
      </div>

      <div class="filter-row">
        <div class="tabs" role="tablist" aria-label="Product status">
          <button class="tab active" type="button">All products</button>
          <button class="tab" type="button">Active</button>
          <button class="tab" type="button">Drafts</button>
          <button class="tab" type="button">Archived</button>
        </div>
        <button class="filter-button" type="button"><span>☷</span> Filters</button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <input type="checkbox" aria-label="Select all products" />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Status</th>
              <th class="action-cell"></th>
            </tr>
          </thead>
          <tbody v-if="loading">
            <tr>
              <td class="table-message" colspan="6">Loading products...</td>
            </tr>
          </tbody>
          <tbody v-else-if="error">
            <tr>
              <td class="table-message error-message" colspan="6">
                Unable to load products: {{ error.message }}
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="products.length">
            <tr v-for="product in products" :key="product.id">
              <td class="checkbox-cell">
                <input type="checkbox" :aria-label="`Select ${product.name}`" />
              </td>
              <td>
                <div class="product-name">
                  <span class="product-avatar">{{ product.name.charAt(0) }}</span>
                  <div>
                    <strong>{{ product.name }}</strong>
                    <small>{{ product.slug }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="sku">{{ product.sku }}</span>
              </td>
              <td>{{ product.category?.name ?? 'Uncategorized' }}</td>
              <td>
                <span class="status"><i></i> Published</span>
              </td>
              <td class="action-cell">
                <button class="more-button" type="button" aria-label="More options">•••</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="table-message" colspan="6">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <span
          >Showing <strong>{{ products.length }}</strong> of
          <strong>{{ total.toLocaleString() }}</strong> products</span
        >
        <div class="pagination">
          <button type="button" aria-label="Previous page" :disabled="page === 1" @click="page--">
            ‹
          </button>
          <span>Page {{ page }}</span>
          <button
            type="button"
            aria-label="Next page"
            :disabled="products.length < limit"
            @click="page++"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  background: #f7f8fc;
  color: #172033;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.products-page {
  min-height: 100vh;
  padding: 42px clamp(20px, 5vw, 72px) 64px;
  background: radial-gradient(circle at 90% -10%, #ece9ff 0, transparent 34%), #f7f8fc;
}

.page-heading,
.table-toolbar,
.filter-row,
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-heading {
  margin: 0 auto 34px;
  max-width: 1440px;
}

.eyebrow {
  color: #8174e8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin: 0 0 11px;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  color: #161d32;
  font-size: clamp(30px, 4vw, 42px);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 10px;
}

.heading-copy,
.table-toolbar p {
  color: #8a91a4;
  font-size: 14px;
  margin-bottom: 0;
}

.heading-actions {
  display: flex;
  gap: 12px;
}

.button {
  align-items: center;
  border: 0;
  border-radius: 10px;
  display: inline-flex;
  font-size: 13px;
  font-weight: 700;
  gap: 8px;
  padding: 13px 18px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: #7769e8;
  box-shadow: 0 8px 18px #7769e83b;
  color: white;
}

.button-secondary {
  background: white;
  border: 1px solid #e6e8f0;
  color: #586074;
}

.button-icon {
  font-size: 17px;
  line-height: 1;
}

.stats-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto 26px;
  max-width: 1440px;
}

.stat-card {
  align-items: flex-start;
  background: #fff;
  border: 1px solid #eceef5;
  border-radius: 14px;
  box-shadow: 0 6px 24px #28305208;
  display: flex;
  gap: 14px;
  min-width: 0;
  padding: 20px;
}

.stat-card-highlight {
  border-color: #dbd7ff;
  box-shadow: 0 8px 25px #7769e812;
}

.stat-icon {
  align-items: center;
  border-radius: 10px;
  display: flex;
  flex: 0 0 38px;
  font-size: 18px;
  font-weight: 800;
  height: 38px;
  justify-content: center;
}

.purple {
  background: #eeecff;
  color: #7568e9;
}
.green {
  background: #e8f8f0;
  color: #28ad72;
}
.orange {
  background: #fff2df;
  color: #ee9b35;
}
.blue {
  background: #e7f2ff;
  color: #478ddd;
}

.stat-card p {
  color: #9096a8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.stat-card strong {
  color: #20283c;
  display: block;
  font-size: 24px;
  letter-spacing: -0.03em;
  margin-bottom: 7px;
}

.stat-change {
  color: #28a970;
  font-size: 11px;
  font-weight: 700;
}

.stat-change small {
  color: #a0a5b3;
  font-size: 10px;
  font-weight: 500;
  margin-left: 3px;
}

.products-card {
  background: white;
  border: 1px solid #eaecf3;
  border-radius: 16px;
  box-shadow: 0 10px 32px #2830520a;
  margin: 0 auto;
  max-width: 1440px;
  overflow: hidden;
}

.table-toolbar {
  padding: 25px 28px 20px;
}

.table-toolbar h2 {
  color: #20283c;
  font-size: 18px;
  letter-spacing: -0.02em;
  margin-bottom: 7px;
}

.table-toolbar h2 span {
  background: #f0eeff;
  border-radius: 20px;
  color: #7669e4;
  font-size: 11px;
  margin-left: 6px;
  padding: 4px 8px;
  vertical-align: 2px;
}

.search-box {
  align-items: center;
  border: 1px solid #e6e8f0;
  border-radius: 9px;
  color: #9da3b2;
  display: flex;
  gap: 8px;
  padding: 10px 13px;
  width: 235px;
}

.search-box span {
  font-size: 21px;
  line-height: 15px;
}

.search-box input {
  border: 0;
  color: #31394d;
  font-size: 12px;
  outline: 0;
  width: 100%;
}

.filter-row {
  border-bottom: 1px solid #f0f1f5;
  border-top: 1px solid #f0f1f5;
  padding: 0 28px;
}

.tabs {
  display: flex;
  gap: 25px;
}

.tab {
  background: transparent;
  border: 0;
  color: #969cac;
  font-size: 12px;
  font-weight: 600;
  padding: 15px 0 13px;
  position: relative;
}

.tab.active {
  color: #7669e5;
}

.tab.active::after {
  background: #7669e5;
  border-radius: 3px 3px 0 0;
  bottom: -1px;
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
}

.filter-button {
  background: transparent;
  border: 0;
  color: #747c90;
  font-size: 12px;
  font-weight: 600;
}

.filter-button span {
  color: #7669e5;
  font-size: 17px;
  margin-right: 5px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  min-width: 760px;
  width: 100%;
}

th {
  background: #fbfbfd;
  color: #9ba1b0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 14px 18px;
  text-align: left;
  text-transform: uppercase;
}

td {
  border-top: 1px solid #f0f1f5;
  color: #60687a;
  font-size: 12px;
  padding: 13px 18px;
}

.checkbox-cell {
  padding-left: 28px;
  width: 48px;
}

input[type='checkbox'] {
  accent-color: #7669e5;
  height: 15px;
  width: 15px;
}

.product-name {
  align-items: center;
  display: flex;
  gap: 11px;
  min-width: 235px;
}

.product-avatar {
  align-items: center;
  background: linear-gradient(135deg, #e8e4ff, #d6d1ff);
  border-radius: 9px;
  color: #7164dd;
  display: flex;
  flex: 0 0 34px;
  font-size: 14px;
  font-weight: 800;
  height: 34px;
  justify-content: center;
}

.product-name strong {
  color: #30394c;
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-name small {
  color: #a4a9b5;
  font-size: 10px;
}

.sku {
  color: #697186;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}

.status {
  align-items: center;
  background: #eaf9f1;
  border-radius: 20px;
  color: #2a9c6a;
  display: inline-flex;
  font-size: 10px;
  font-weight: 700;
  gap: 5px;
  padding: 5px 9px;
}

.status i {
  background: #37bb7d;
  border-radius: 50%;
  height: 5px;
  width: 5px;
}

.action-cell {
  text-align: right;
  width: 54px;
}

.more-button {
  background: transparent;
  border: 0;
  color: #a5aab7;
  letter-spacing: 2px;
}

.table-message {
  color: #8f96a8;
  padding: 45px 20px;
  text-align: center;
}

.error-message {
  color: #d65b69;
}

.table-footer {
  border-top: 1px solid #f0f1f5;
  color: #a0a5b2;
  font-size: 11px;
  padding: 16px 28px;
}

.table-footer strong {
  color: #6b7384;
}

.pagination {
  align-items: center;
  display: flex;
  gap: 10px;
}

.pagination button {
  background: white;
  border: 1px solid #e5e7ee;
  border-radius: 6px;
  color: #687186;
  font-size: 18px;
  height: 27px;
  line-height: 20px;
  width: 27px;
}

.pagination button:disabled {
  color: #d2d5dd;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .products-page {
    padding: 28px 14px 40px;
  }

  .page-heading,
  .table-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .heading-actions,
  .search-box {
    width: 100%;
  }

  .heading-actions .button {
    flex: 1;
    justify-content: center;
  }

  .stats-grid {
    gap: 10px;
  }

  .stat-card {
    padding: 13px;
  }

  .stat-icon {
    display: none;
  }

  .table-toolbar,
  .filter-row,
  .table-footer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .tabs {
    gap: 14px;
    overflow-x: auto;
  }

  .filter-button {
    display: none;
  }
}
</style>
