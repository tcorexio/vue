<script setup lang="ts">
import { computed } from 'vue'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

interface Order {
  created_at?: string | null
  placed_at?: string | null
}

const props = defineProps<{
  orders: Order[]
}>()

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const orderDates = computed(() =>
  props.orders
    .map((order) => order.placed_at ?? order.created_at)
    .filter((date): date is string => Boolean(date))
    .map((date) => date.slice(0, 10))
    .sort(),
)

const chartData = computed(() => {
  const uniqueDates = [...new Set(orderDates.value)]
  const labels = uniqueDates.map((date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    }),
  )
  const values = uniqueDates.map(
    (date) => orderDates.value.filter((orderDate) => orderDate === date).length,
  )

  return {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: values,
        borderRadius: 6,
        backgroundColor: '#8174e8',
        hoverBackgroundColor: '#7063de',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: { parsed: { y: number | null } }) =>
          `${context.parsed.y ?? 0} orders`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
}
</script>

<template>
  <div v-if="!orders.length || !orderDates.length" class="empty-chart">
    No order dates were returned by the API.
  </div>
  <div v-else class="chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart {
  height: 260px;
}
.empty-chart {
  display: grid;
  height: 260px;
  place-items: center;
  color: #8e96a6;
  font-size: 13px;
}
</style>
