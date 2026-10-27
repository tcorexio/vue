<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">S</span>
        <span>Store admin</span>
      </div>

      <p class="menu-label">Overview</p>
      <nav class="navigation" aria-label="Main navigation">
        <RouterLink class="navigation-item active" to="/">
          <span class="navigation-icon">▦</span>
          Dashboard
        </RouterLink>
        <RouterLink class="navigation-item" to="/products">
          <span class="navigation-icon">□</span>
          Products
        </RouterLink>
        <RouterLink class="navigation-item" to="/orders">
          <span class="navigation-icon">◫</span>
          Orders
        </RouterLink>
        <RouterLink class="navigation-item" to="/customers">
          <span class="navigation-icon">♙</span>
          Customers
        </RouterLink>
        <RouterLink class="navigation-item" to="/inventory">
          <span class="navigation-icon">▤</span>
          Inventory
        </RouterLink>
      </nav>

      <p class="menu-label">Management</p>
      <nav class="navigation" aria-label="Management navigation">
        <RouterLink class="navigation-item" to="/cart"><span class="navigation-icon">▣</span>Cart</RouterLink>
        <RouterLink class="navigation-item" to="/categories"><span class="navigation-icon">◇</span>Categories</RouterLink>
        <RouterLink class="navigation-item" to="/warehouses"><span class="navigation-icon">⌂</span>Warehouses</RouterLink>
        <RouterLink class="navigation-item" to="/reviews"><span class="navigation-icon">★</span>Reviews</RouterLink>
        <RouterLink class="navigation-item" to="/version"><span class="navigation-icon">⚙</span>Version</RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="user-avatar">AD</div>
        <div>
          <strong>Admin user</strong>
          <small>Store manager</small>
        </div>
        <span class="more-icon">···</span>
      </div>
    </aside>

    <div class="main-shell">
      <header class="topbar">
        <div class="breadcrumb">Store admin <span>/</span> Dashboard</div>
        <div class="topbar-actions">
          <button type="button" aria-label="Search">⌕</button>
          <button type="button" aria-label="Notifications">♢</button>
          <span class="topbar-avatar">AD</span>
        </div>
      </header>
      <RouterView />
    </div>
  </div>
</template>

<style>
:root {
  color: #172033;
  background: #f7f8fc;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

button {
  font: inherit;
}

.app-shell {
  display: flex;
  min-height: 100vh;
  background: #f7f8fc;
}

.sidebar {
  display: flex;
  width: 248px;
  flex-shrink: 0;
  flex-direction: column;
  padding: 26px 16px 18px;
  color: #a7aec2;
  background: #151927;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 12px 38px;
  color: #fff;
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.brand-mark,
.user-avatar,
.topbar-avatar {
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #fff;
  background: #8174e8;
}

.brand-mark {
  width: 29px;
  height: 29px;
  font-size: 15px;
}

.menu-label {
  margin: 0 12px 9px;
  color: #676f86;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.navigation {
  display: grid;
  gap: 4px;
  margin-bottom: 29px;
}

.navigation-item {
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 8px;
  color: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.navigation-item.active,
.navigation-item:hover {
  color: #fff;
  background: #262b40;
}

.navigation-icon {
  width: 18px;
  color: #8d87e9;
  font-size: 17px;
  text-align: center;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: auto;
  padding: 16px 10px 0;
  border-top: 1px solid #292e40;
  font-size: 11px;
}

.user-avatar,
.topbar-avatar {
  width: 30px;
  height: 30px;
  font-size: 10px;
  font-weight: 800;
}

.sidebar-footer strong,
.sidebar-footer small {
  display: block;
}

.sidebar-footer strong {
  color: #e8eaf2;
}

.sidebar-footer small {
  margin-top: 3px;
  color: #727a91;
}

.more-icon {
  margin-left: auto;
  color: #727a91;
  font-weight: 800;
}

.main-shell {
  min-width: 0;
  flex: 1;
}

.topbar {
  display: flex;
  height: 72px;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(20px, 4vw, 58px);
  border-bottom: 1px solid #e8eaf1;
  background: #fff;
}

.breadcrumb {
  color: #81899b;
  font-size: 13px;
  font-weight: 600;
}

.breadcrumb span {
  margin: 0 9px;
  color: #c5c9d4;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 21px;
}

.topbar-actions button {
  border: 0;
  color: #81899b;
  background: transparent;
  font-size: 23px;
  line-height: 1;
}

.topbar-avatar {
  width: 34px;
  height: 34px;
}

@media (max-width: 720px) {
  .sidebar {
    width: 68px;
    padding-inline: 10px;
  }

  .brand {
    padding-inline: 9px;
  }

  .brand > span:last-child,
  .menu-label,
  .navigation-item:not(.active)::after,
  .navigation-item {
    font-size: 0;
  }

  .navigation-item {
    justify-content: center;
    padding: 0;
  }

  .navigation-icon {
    font-size: 17px;
  }

  .sidebar-footer {
    justify-content: center;
    padding-inline: 0;
  }

  .sidebar-footer > div:not(.user-avatar),
  .more-icon {
    display: none;
  }
}
</style>
