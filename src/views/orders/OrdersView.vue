<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import OrdersByDayChart from '@/components/charts/OrdersByDayChart.vue'
import { GET_ORDERS_PAGINATION } from '@/graphql/orders/queries'

interface Customer {
  email?: string | null
  id: number
  name?: string | null
}

interface Order {
  id: number
  created_at?: string | null
  number?: string | null
  notes?: string | null
  customer?: Customer | null
  currency?: string | null
  delivered_at?: string | null
  discount?: number | null
  paid_at?: string | null
  payment_method?: string | null
  placed_at?: string | null
  shipped_at?: string | null
  shipping?: number | null
  shipping_address?: string | null
  shipping_method?: string | null
  status?: string | null
  subtotal?: number | null
  tax?: number | null
  total?: number | null
  tracking_number?: string | null
  updated_at?: string | null
}

const page = ref(1)
const search = ref('')
const limit = 10
const { result, loading, error } = useQuery(GET_ORDERS_PAGINATION, () => ({
  limit,
  page: page.value,
  q: search.value || undefined,
}))
const orders = ref<Order[]>([])
const total = ref(0)
const pages = ref(1)
const chartOrderCount = computed(() => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - 6)

  return orders.value.filter((order) => {
    const date = order.placed_at ?? order.created_at
    return date ? new Date(date) >= start : false
  }).length
})

watch(
  result,
  (value) => {
    orders.value = value?.orders?.data ?? []
    total.value = value?.orders?.total ?? 0
    pages.value = value?.orders?.pages ?? 1
  },
  { immediate: true },
)

function date(value?: string | null) {
  return value ? new Date(value).toLocaleDateString() : '—'
}

function money(value?: number | null, currency?: string | null) {
  return value === null || value === undefined
    ? '—'
    : `${value.toLocaleString()} ${currency ?? ''}`.trim()
}
</script>

<template>
  <main class="orders-page">
    <section class="page-heading">
      <div>
        <p class="eyebrow">STORE MANAGEMENT / ORDERS</p>
        <h1>Orders</h1>
        <p class="heading-copy">
          Track payments, fulfillment and customer details for every order.
        </p>
      </div>
      <button class="button" type="button">Export</button>
    </section>

    <section class="stats">
      <article>
        <span class="icon purple">◫</span>
        <div>
          <p>Total orders</p>
          <strong>{{ total.toLocaleString() }}</strong
          ><small>All store orders</small>
        </div>
      </article>
      <article>
        <span class="icon green">✓</span>
        <div>
          <p>On this page</p>
          <strong>{{ orders.length }}</strong
          ><small>Orders displayed</small>
        </div>
      </article>
      <article>
        <span class="icon orange">!</span>
        <div>
          <p>Current page</p>
          <strong>{{ page }}</strong
          ><small>of {{ pages }}</small>
        </div>
      </article>
    </section>

    <section class="report-card">
      <div class="report-heading">
        <div>
          <p class="eyebrow">ORDER REPORT</p>
          <h2>Orders in the last 7 days</h2>
          <p class="heading-copy">Loaded from the orders API response.</p>
        </div>
        <div class="report-summary">
          <strong>{{ chartOrderCount }}</strong>
          <span>Orders in chart</span>
        </div>
      </div>
      <div v-if="loading" class="chart-message">Loading chart data...</div>
      <div v-else-if="error" class="chart-message error">
        Unable to load chart: {{ error.message }}
      </div>
      <OrdersByDayChart v-else :orders="orders" />
    </section>

    <section class="card">
      <div class="card-heading">
        <div>
          <h2>
            All orders <span>{{ total.toLocaleString() }}</span>
          </h2>
          <p>View order, payment, shipping and customer information.</p>
        </div>
        <label class="search"
          ><span>⌕</span
          ><input v-model="search" type="search" placeholder="Search orders..." @input="page = 1"
        /></label>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>Shipping</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Shipping address</th>
              <th>Shipping method</th>
              <th>Tracking</th>
              <th>Placed</th>
              <th>Paid</th>
              <th>Shipped</th>
              <th>Delivered</th>
              <th>Updated</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody v-if="loading">
            <tr>
              <td class="message" colspan="18">Loading orders...</td>
            </tr>
          </tbody>
          <tbody v-else-if="error">
            <tr>
              <td class="message error" colspan="18">Unable to load orders: {{ error.message }}</td>
            </tr>
          </tbody>
          <tbody v-else-if="orders.length">
            <tr v-for="order in orders" :key="order.id">
              <td>
                <strong>{{ order.number ?? `#${order.id}` }}</strong
                ><small>ID: {{ order.id }}</small>
              </td>
              <td>
                <strong>{{ order.customer?.name ?? 'Unknown customer' }}</strong
                ><small>{{ order.customer?.email ?? '—' }}</small>
              </td>
              <td>
                <span class="status">{{ order.status ?? '—' }}</span>
              </td>
              <td>
                {{ order.payment_method ?? '—' }}<small>{{ date(order.paid_at) }}</small>
              </td>
              <td>{{ money(order.subtotal, order.currency) }}</td>
              <td>{{ money(order.discount, order.currency) }}</td>
              <td>{{ money(order.shipping, order.currency) }}</td>
              <td>{{ money(order.tax, order.currency) }}</td>
              <td>
                <strong>{{ money(order.total, order.currency) }}</strong>
              </td>
              <td>{{ order.shipping_address ?? '—' }}</td>
              <td>{{ order.shipping_method ?? '—' }}</td>
              <td>{{ order.tracking_number ?? '—' }}</td>
              <td>{{ date(order.placed_at) }}</td>
              <td>{{ date(order.paid_at) }}</td>
              <td>{{ date(order.shipped_at) }}</td>
              <td>{{ date(order.delivered_at) }}</td>
              <td>{{ date(order.updated_at) }}</td>
              <td>{{ order.notes ?? '—' }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="message" colspan="18">No orders found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer class="footer">
        <span
          >Showing <strong>{{ orders.length }}</strong> of
          <strong>{{ total.toLocaleString() }}</strong> orders</span
        >
        <div>
          <button type="button" :disabled="page <= 1" @click="page--">‹</button
          ><span>Page {{ page }} of {{ pages }}</span
          ><button type="button" :disabled="page >= pages" @click="page++">›</button>
        </div>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.orders-page {
  min-height: calc(100vh - 72px);
  padding: 42px clamp(20px, 4vw, 58px) 64px;
  background: radial-gradient(circle at 93% -10%, #ece9ff 0, transparent 30%), #f7f8fc;
}
.page-heading,
.card-heading,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.page-heading {
  max-width: 1440px;
  margin: 0 auto 30px;
}
.eyebrow {
  margin: 0 0 8px;
  color: #8174e8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
h1 {
  margin: 0 0 8px;
  color: #172033;
  font-size: clamp(28px, 3vw, 36px);
}
.heading-copy,
.card-heading p {
  margin: 0;
  color: #8a91a1;
  font-size: 13px;
}
.button {
  border: 1px solid #e1e4ec;
  border-radius: 7px;
  padding: 10px 14px;
  color: #4a5367;
  background: #fff;
  font-size: 12px;
  font-weight: 700;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 1440px;
  margin: 0 auto 22px;
}
.stats article {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 110px;
  padding: 20px;
  border: 1px solid #e9ebf2;
  border-radius: 11px;
  background: #fff;
}
.icon {
  display: grid;
  width: 37px;
  height: 37px;
  place-items: center;
  border-radius: 9px;
  font-weight: 800;
}
.purple {
  color: #7063de;
  background: #eeecff;
}
.green {
  color: #39966b;
  background: #e6f7ee;
}
.orange {
  color: #e49a43;
  background: #fff1dc;
}
.stats p {
  margin: 0 0 6px;
  color: #8c93a2;
  font-size: 12px;
}
.stats strong {
  display: block;
  margin-bottom: 4px;
  font-size: 22px;
}
.stats small {
  color: #9aa1af;
  font-size: 10px;
}
.report-card {
  max-width: 1440px;
  margin: 0 auto 22px;
  padding: 24px;
  border: 1px solid #e9ebf2;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 5px 16px #30385b08;
}
.report-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}
.report-heading h2 {
  margin: 0 0 6px;
  font-size: 17px;
}
.report-summary {
  min-width: 110px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f5f3ff;
  text-align: right;
}
.report-summary strong,
.report-summary span {
  display: block;
}
.report-summary strong {
  color: #7063de;
  font-size: 22px;
}
.report-summary span {
  margin-top: 3px;
  color: #8e96a6;
  font-size: 10px;
}
.chart-message {
  display: grid;
  height: 260px;
  place-items: center;
  color: #8e96a6;
  font-size: 13px;
}
.chart-message.error {
  color: #c55757;
}
.card {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #e9ebf2;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 5px 16px #30385b08;
}
.card-heading {
  margin-bottom: 23px;
}
.card-heading h2 {
  margin: 0 0 6px;
  font-size: 17px;
}
.card-heading h2 span {
  color: #8e96a6;
  font-size: 12px;
  font-weight: 500;
}
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 240px;
  padding: 9px 12px;
  border: 1px solid #e1e4ec;
  border-radius: 7px;
  color: #9aa1af;
}
.search input {
  width: 100%;
  border: 0;
  outline: 0;
  font-size: 12px;
}
.table-wrap {
  overflow-x: auto;
  border: 1px solid #edf0f4;
  border-radius: 8px;
}
table {
  width: 100%;
  min-width: 1900px;
  border-collapse: collapse;
  text-align: left;
}
th {
  color: #8e96a6;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
th,
td {
  padding: 15px 16px;
  border-bottom: 1px solid #edf0f4;
  white-space: nowrap;
}
td {
  color: #5c6576;
  font-size: 12px;
}
td strong,
td small {
  display: block;
}
td small {
  margin-top: 4px;
  color: #a0a6b3;
  font-size: 10px;
}
.status {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 5px;
  color: #7063de;
  background: #eeecff;
  font-size: 10px;
  font-weight: 700;
}
.message {
  padding: 38px;
  color: #8e96a6;
  text-align: center;
}
.error {
  color: #c55757;
}
.footer {
  margin-top: 16px;
  color: #8b93a1;
  font-size: 11px;
}
.footer div {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer button {
  border: 0;
  color: #8b93a1;
  background: transparent;
  font-size: 18px;
}
.footer button:disabled {
  opacity: 0.4;
}
@media (max-width: 700px) {
  .page-heading,
  .card-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .search {
    width: 100%;
  }
  .stats {
    grid-template-columns: 1fr;
  }
  .report-heading {
    flex-direction: column;
  }
  .report-summary {
    width: 100%;
    text-align: left;
  }
}
</style>
