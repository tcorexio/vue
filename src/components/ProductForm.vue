<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_CATEGORIES } from '@/graphql/products/queries'
import type { Product, ProductStatus } from '@/types/product'

const props = defineProps<{ product?: Product; submitting?: boolean }>()
const emit = defineEmits<{ submit: [input: Record<string, unknown>]; cancel: [] }>()
const { result: categoriesResult } = useQuery(GET_CATEGORIES, { limit: 100 })
const categories = computed(() => categoriesResult.value?.categories?.data ?? [])
const submitted = ref(false)

const form = reactive({
  sku: props.product?.sku ?? '',
  name: props.product?.name ?? '',
  slug: props.product?.slug ?? '',
  description: props.product?.description ?? '',
  category_id: props.product?.category_id ?? 0,
  brand: props.product?.brand ?? '',
  price: props.product?.price ?? 0,
  compare_at_price: props.product?.compare_at_price ?? null,
  currency: props.product?.currency ?? 'USD',
  color: props.product?.color ?? '',
  weight_g: props.product?.weight_g ?? null,
  in_stock: props.product?.in_stock ?? true,
  status: props.product?.status ?? ('draft' as ProductStatus),
})

const isEditing = computed(() => Boolean(props.product))

function submit() {
  submitted.value = true
  if (!form.sku.trim() || !form.name.trim() || !form.category_id || form.price < 0) return
  const input = {
    ...form,
    slug: form.slug || undefined,
    description: form.description || undefined,
    brand: form.brand || undefined,
    color: form.color || undefined,
    compare_at_price: form.compare_at_price || undefined,
    weight_g: form.weight_g || undefined,
  }
  emit('submit', input)
}
</script>

<template>
  <form class="product-form" @submit.prevent="submit">
    <div class="form-heading">
      <div>
        <p class="eyebrow">{{ isEditing ? 'EDIT PRODUCT' : 'NEW PRODUCT' }}</p>
        <h1>{{ isEditing ? 'Edit product' : 'Add product' }}</h1>
        <p>Fill in the product details below. Fields marked with * are required.</p>
      </div>
      <div class="form-actions">
        <button class="button secondary" type="button" @click="emit('cancel')">Cancel</button>
        <button class="button primary" type="submit" :disabled="submitting">
          {{ submitting ? 'Saving...' : isEditing ? 'Save changes' : 'Create product' }}
        </button>
      </div>
    </div>

    <section class="form-card">
      <h2>General information</h2>
      <div class="form-grid">
        <label>Product name *<input v-model="form.name" type="text" placeholder="e.g. Classic T-shirt" /></label>
        <label>SKU *<input v-model="form.sku" type="text" placeholder="e.g. TS-001" /></label>
        <label>Slug<input v-model="form.slug" type="text" placeholder="classic-t-shirt" /></label>
        <label>Brand<input v-model="form.brand" type="text" placeholder="Brand name" /></label>
        <label class="wide">Description<textarea v-model="form.description" rows="4" placeholder="Describe this product..." /></label>
      </div>
    </section>

    <section class="form-card">
      <h2>Pricing and inventory</h2>
      <div class="form-grid">
        <label>Price *<input v-model.number="form.price" min="0" step="0.01" type="number" /></label>
        <label>Compare at price<input v-model.number="form.compare_at_price" min="0" step="0.01" type="number" /></label>
        <label>Currency<select v-model="form.currency"><option>USD</option><option>VND</option><option>EUR</option></select></label>
        <label>Weight (g)<input v-model.number="form.weight_g" min="0" type="number" /></label>
        <label>Category *<select v-model.number="form.category_id"><option :value="0" disabled>Select a category</option><option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option></select></label>
        <label>Status<select v-model="form.status"><option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
        <label class="check-label"><input v-model="form.in_stock" type="checkbox" /> Product is in stock</label>
      </div>
      <p v-if="submitted && (!form.sku.trim() || !form.name.trim() || !form.category_id || form.price < 0)" class="form-error">
        Please complete the required fields and use a valid price.
      </p>
    </section>
  </form>
</template>

<style scoped>
.product-form { max-width: 1050px; margin: 0 auto; padding: 42px 24px 70px; }
.form-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; margin-bottom: 28px; }
.eyebrow { color: #7769e8; font-size: 11px; font-weight: 800; letter-spacing: .15em; margin: 0 0 10px; }
h1 { color: #172033; font-size: 38px; letter-spacing: -.04em; margin: 0 0 8px; }
.form-heading p:last-child { color: #8a91a4; font-size: 14px; margin: 0; }
.form-actions { display: flex; gap: 10px; }
.button { border: 0; border-radius: 9px; cursor: pointer; font-weight: 700; padding: 12px 17px; }
.primary { background: #7769e8; color: white; }
.secondary { background: white; border: 1px solid #e3e5ee; color: #5f687b; }
.button:disabled { cursor: wait; opacity: .6; }
.form-card { background: white; border: 1px solid #eaecf3; border-radius: 15px; box-shadow: 0 8px 25px #2830520a; margin-bottom: 18px; padding: 25px; }
h2 { color: #20283c; font-size: 17px; margin: 0 0 20px; }
.form-grid { display: grid; gap: 18px; grid-template-columns: repeat(2, 1fr); }
label { color: #667084; display: flex; flex-direction: column; font-size: 12px; font-weight: 700; gap: 8px; }
input, textarea, select { background: #fff; border: 1px solid #e2e5ed; border-radius: 8px; color: #263047; font-size: 13px; outline: 0; padding: 11px 12px; }
input:focus, textarea:focus, select:focus { border-color: #8c82ec; box-shadow: 0 0 0 3px #7769e81c; }
textarea { resize: vertical; }
.wide { grid-column: 1 / -1; }
.check-label { align-items: center; flex-direction: row; margin-top: 24px; }
.check-label input { accent-color: #7769e8; }
.form-error { color: #c94d5e; font-size: 12px; margin: 18px 0 0; }
@media (max-width: 650px) { .form-heading { align-items: flex-start; flex-direction: column; } .form-actions { width: 100%; } .button { flex: 1; } .form-grid { grid-template-columns: 1fr; } .wide { grid-column: auto; } }
</style>
