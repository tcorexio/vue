<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="dashboard">
    <section class="page-heading">
      <div>
        <p class="eyebrow">OVERVIEW</p>
        <h1>Dashboard</h1>
        <p class="heading-copy">Manage your store and keep track of the latest activity.</p>
      </div>
      <button class="date-button" type="button">Last 30 days <span>⌄</span></button>
    </section>

    <section class="stats-grid" aria-label="Store overview">
      <article class="stat-card highlight">
        <span class="stat-icon purple">□</span>
        <div><p>Total products</p><strong>1,248</strong><small>↗ 4.2% vs last month</small></div>
      </article>
      <article class="stat-card">
        <span class="stat-icon green">$</span>
        <div><p>Total revenue</p><strong>$24,860</strong><small>↗ 8.1% vs last month</small></div>
      </article>
      <article class="stat-card">
        <span class="stat-icon orange">◫</span>
        <div><p>Total orders</p><strong>1,248</strong><small>↗ 3.6% vs last month</small></div>
      </article>
      <article class="stat-card">
        <span class="stat-icon blue">♙</span>
        <div><p>Customers</p><strong>842</strong><small>↗ 5.4% vs last month</small></div>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel activity-panel">
        <div class="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your store</p></div><button type="button">View all</button></div>
        <div class="activity-row"><span class="activity-symbol purple">□</span><div><strong>New product added</strong><p>Wireless headphones · 2 minutes ago</p></div><span class="status ready">Completed</span></div>
        <div class="activity-row"><span class="activity-symbol green">✓</span><div><strong>Order #1048 paid</strong><p>Customer order · 18 minutes ago</p></div><span class="status ready">Completed</span></div>
        <div class="activity-row"><span class="activity-symbol orange">!</span><div><strong>Low inventory alert</strong><p>5 products need attention</p></div><span class="status pending">Review</span></div>
      </article>

      <article class="panel quick-panel">
        <div class="panel-heading"><div><h2>Quick access</h2><p>Store management areas</p></div></div>
        <div class="quick-grid">
          <RouterLink to="/cart">cart <b>→</b></RouterLink><RouterLink to="/carts">carts <b>→</b></RouterLink>
          <RouterLink to="/categories">categories <b>→</b></RouterLink><RouterLink to="/category">category <b>→</b></RouterLink>
          <RouterLink to="/customer">customer <b>→</b></RouterLink><RouterLink to="/customers">customers <b>→</b></RouterLink>
          <RouterLink to="/inventory">inventory <b>→</b></RouterLink><RouterLink to="/inventory-level">inventory_level <b>→</b></RouterLink>
          <RouterLink to="/order">order <b>→</b></RouterLink><RouterLink to="/order-item">order_item <b>→</b></RouterLink>
          <RouterLink to="/order-items">order_items <b>→</b></RouterLink><RouterLink to="/orders">orders <b>→</b></RouterLink>
          <RouterLink to="/product">product <b>→</b></RouterLink><RouterLink to="/products">products <b>→</b></RouterLink>
          <RouterLink to="/review">review <b>→</b></RouterLink><RouterLink to="/reviews">reviews <b>→</b></RouterLink>
          <RouterLink to="/version">version <b>→</b></RouterLink><RouterLink to="/warehouse">warehouse <b>→</b></RouterLink>
          <RouterLink to="/warehouses">warehouses <b>→</b></RouterLink><RouterLink to="/writes">writes <b>→</b></RouterLink>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  min-height: calc(100vh - 72px);
  padding: 42px clamp(20px, 4vw, 58px) 64px;
  background: radial-gradient(circle at 93% -10%, #ece9ff 0, transparent 30%), #f7f8fc;
}

.page-heading,
.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-heading {
  max-width: 1440px;
  margin: 0 auto 34px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #8174e8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .12em;
}

h1, h2, p { margin-top: 0; }
h1 { margin-bottom: 8px; font-size: clamp(28px, 3vw, 36px); letter-spacing: -.04em; }
h2 { margin-bottom: 6px; font-size: 17px; }
.heading-copy, .panel-heading p { margin-bottom: 0; color: #8a91a1; font-size: 13px; }
.date-button { padding: 10px 14px; border: 1px solid #e1e4ec; border-radius: 8px; color: #4a5367; background: #fff; font-size: 12px; font-weight: 650; }
.date-button span { margin-left: 15px; color: #9097a7; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 1440px; margin: 0 auto 22px; }
.stat-card { display: flex; align-items: flex-start; gap: 14px; min-height: 132px; padding: 22px; border: 1px solid #e9ebf2; border-radius: 11px; background: #fff; box-shadow: 0 5px 16px #30385b08; }
.stat-card.highlight { border-color: #dbd7ff; box-shadow: 0 8px 22px #8174e81c; }
.stat-icon, .activity-symbol { display: grid; place-items: center; flex-shrink: 0; border-radius: 9px; font-weight: 800; }
.stat-icon { width: 37px; height: 37px; font-size: 19px; }
.purple { color: #7063de; background: #eeecff; }
.green { color: #39966b; background: #e6f7ee; }
.orange { color: #e49a43; background: #fff1dc; }
.blue { color: #5d8dcc; background: #e9f2ff; }
.stat-card p { margin-bottom: 8px; color: #8c93a2; font-size: 12px; }
.stat-card strong { display: block; margin-bottom: 7px; color: #252d40; font-size: 24px; letter-spacing: -.03em; }
.stat-card small { color: #42a276; font-size: 10px; font-weight: 700; }

.content-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(300px, 1fr); gap: 22px; max-width: 1440px; margin: 0 auto; }
.panel { padding: 23px; border: 1px solid #e9ebf2; border-radius: 11px; background: #fff; box-shadow: 0 5px 16px #30385b08; }
.panel-heading { margin-bottom: 22px; }
.panel-heading button { border: 0; color: #7469dc; background: transparent; font-size: 12px; font-weight: 750; }
.activity-row { display: flex; align-items: center; gap: 13px; padding: 14px 0; border-top: 1px solid #eef0f4; }
.activity-symbol { width: 32px; height: 32px; font-size: 13px; }
.activity-row strong { display: block; margin-bottom: 4px; font-size: 12px; }
.activity-row p { margin: 0; color: #9198a7; font-size: 11px; }
.status { margin-left: auto; padding: 5px 8px; border-radius: 5px; font-size: 10px; font-weight: 750; }
.status.ready { color: #39966b; background: #e9f8ef; }
.status.pending { color: #d98f32; background: #fff3df; }
.quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.quick-grid a { display: flex; justify-content: space-between; padding: 13px 12px; border: 1px solid #eef0f5; border-radius: 7px; color: #4e576b; font-size: 12px; font-weight: 650; text-decoration: none; }
.quick-grid b { color: #887ce2; }

@media (max-width: 1000px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .content-grid { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .page-heading { align-items: flex-start; gap: 18px; flex-direction: column; } .stats-grid { grid-template-columns: 1fr; } .stat-card { min-height: 110px; } .panel { padding: 17px; } .status { display: none; } }
</style>
