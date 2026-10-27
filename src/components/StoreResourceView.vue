<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  resource: string
  isCollection?: boolean
}>()

const rows = ['Example record', 'Pending record', 'Archived record']
const description = computed(() => `Manage ${props.title.toLowerCase()} information and records.`)
</script>

<template>
  <main class="resource-page">
    <section class="page-heading">
      <div>
        <p class="eyebrow">STORE MANAGEMENT / {{ resource.toUpperCase() }}</p>
        <h1>{{ title }}</h1>
        <p class="heading-copy">{{ description }}</p>
      </div>
      <div class="heading-actions">
        <button class="button secondary" type="button">Export</button>
        <button class="button primary" type="button">+ Add {{ title }}</button>
      </div>
    </section>

    <section class="stats">
      <article><span class="icon purple">▦</span><div><p>Total records</p><strong>0</strong><small>No data connected</small></div></article>
      <article><span class="icon green">✓</span><div><p>Active</p><strong>0</strong><small>Waiting for setup</small></div></article>
      <article><span class="icon orange">!</span><div><p>Needs attention</p><strong>0</strong><small>No data connected</small></div></article>
    </section>

    <section class="card">
      <div class="card-heading">
        <div><h2>{{ title }} list</h2><p>View and organize {{ title.toLowerCase() }} records.</p></div>
        <label class="search"><span>⌕</span><input type="search" placeholder="Search..." /></label>
      </div>
      <div class="filters">
        <button class="filter active" type="button">All</button>
        <button class="filter" type="button">Active</button>
        <button class="filter" type="button">Draft</button>
        <button class="filter-button" type="button">☷ Filters</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th><input type="checkbox" aria-label="Select all records" /></th><th>Name</th><th>Status</th><th>Updated</th><th></th></tr></thead>
          <tbody>
            <tr v-for="row in rows" :key="row">
              <td><input type="checkbox" :aria-label="`Select ${row}`" /></td>
              <td><strong>{{ row }}</strong><small>{{ isCollection ? 'Collection item' : 'Record detail' }}</small></td>
              <td><span class="status">Not connected</span></td><td>—</td><td><button class="row-action" type="button">···</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="empty-note">This interface is ready for {{ title }} data and actions.</div>
      <footer class="table-footer"><span>Showing 0 records</span><div><button type="button" disabled>‹</button><span>Page 1</span><button type="button" disabled>›</button></div></footer>
    </section>
  </main>
</template>

<style scoped>
.resource-page { min-height: calc(100vh - 72px); padding: 42px clamp(20px, 4vw, 58px) 64px; background: radial-gradient(circle at 93% -10%, #ece9ff 0, transparent 30%), #f7f8fc; }
.page-heading, .card-heading, .table-footer { display: flex; align-items: center; justify-content: space-between; gap: 20px; }.page-heading { max-width: 1440px; margin: 0 auto 30px; }.eyebrow { margin: 0 0 8px; color: #8174e8; font-size: 11px; font-weight: 800; letter-spacing: .12em; }h1 { margin: 0 0 8px; color: #172033; font-size: clamp(28px, 3vw, 36px); letter-spacing: -.04em; }.heading-copy, .card-heading p { margin: 0; color: #8a91a1; font-size: 13px; }.heading-actions { display: flex; gap: 10px; }.button, .filter, .filter-button { border: 1px solid #e1e4ec; border-radius: 7px; padding: 10px 14px; color: #4a5367; background: #fff; font-size: 12px; font-weight: 700; }.button.primary { border-color: #8174e8; color: #fff; background: #8174e8; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1440px; margin: 0 auto 22px; }.stats article { display: flex; align-items: center; gap: 14px; min-height: 110px; padding: 20px; border: 1px solid #e9ebf2; border-radius: 11px; background: #fff; }.icon { display: grid; width: 37px; height: 37px; place-items: center; border-radius: 9px; font-weight: 800; }.purple { color: #7063de; background: #eeecff; }.green { color: #39966b; background: #e6f7ee; }.orange { color: #e49a43; background: #fff1dc; }.stats p { margin: 0 0 6px; color: #8c93a2; font-size: 12px; }.stats strong { display: block; margin-bottom: 4px; font-size: 22px; }.stats small { color: #9aa1af; font-size: 10px; }
.card { max-width: 1440px; margin: 0 auto; padding: 24px; border: 1px solid #e9ebf2; border-radius: 11px; background: #fff; box-shadow: 0 5px 16px #30385b08; }.card-heading { margin-bottom: 23px; }.card-heading h2 { margin: 0 0 6px; font-size: 17px; }.search { display: flex; align-items: center; gap: 8px; width: 240px; padding: 9px 12px; border: 1px solid #e1e4ec; border-radius: 7px; color: #9aa1af; }.search input { width: 100%; border: 0; outline: 0; font-size: 12px; }.filters { display: flex; gap: 8px; margin-bottom: 20px; }.filter { border: 0; }.filter.active { color: #7063de; background: #eeecff; }.filter-button { margin-left: auto; }.table-wrap { overflow-x: auto; border: 1px solid #edf0f4; border-radius: 8px; }table { width: 100%; min-width: 650px; border-collapse: collapse; text-align: left; }th { color: #8e96a6; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }th, td { padding: 15px 16px; border-bottom: 1px solid #edf0f4; }td { color: #5c6576; font-size: 12px; }td strong, td small { display: block; }td small { margin-top: 4px; color: #a0a6b3; font-size: 10px; }.status { padding: 5px 8px; border-radius: 5px; color: #7d8492; background: #f0f2f5; font-size: 10px; font-weight: 700; }.row-action { border: 0; color: #8c93a2; background: transparent; }.empty-note { padding: 18px; color: #9aa1af; font-size: 12px; text-align: center; }.table-footer { color: #8b93a1; font-size: 11px; }.table-footer div { display: flex; align-items: center; gap: 12px; }.table-footer button { border: 0; background: transparent; color: #8b93a1; font-size: 18px; }
@media (max-width: 700px) { .page-heading, .card-heading { align-items: flex-start; flex-direction: column; }.heading-actions, .search { width: 100%; }.stats { grid-template-columns: 1fr; }.filters { overflow-x: auto; }.filter-button { margin-left: 0; white-space: nowrap; } }
</style>
