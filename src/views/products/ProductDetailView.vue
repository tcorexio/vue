<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import ProductForm from '@/components/ProductForm.vue'
import { GET_PRODUCT } from '@/graphql/products/queries'
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/graphql/products/mutations'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()
const productId = computed(() => Number(route.params.id))
const isEditing = computed(() => route.name === 'product-edit')
const { result, loading, error } = useQuery(GET_PRODUCT, () => ({ id: productId.value }), () => ({
  enabled: isEditing.value,
}))
const product = computed<Product | undefined>(() => result.value?.product)
const submitting = ref(false)
const mutationError = ref('')
const { mutate: createProduct } = useMutation(CREATE_PRODUCT)
const { mutate: updateProduct } = useMutation(UPDATE_PRODUCT)

async function save(input: Record<string, unknown>) {
  submitting.value = true
  mutationError.value = ''
  try {
    if (isEditing.value) {
      await updateProduct({ id: productId.value, input })
    } else {
      await createProduct({ input })
    }
    await router.push({ name: 'products' })
  } catch (caught) {
    mutationError.value = caught instanceof Error ? caught.message : 'Unable to save product.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="page">
    <div v-if="isEditing && loading" class="message">Loading product...</div>
    <div v-else-if="isEditing && (error || !product)" class="message error">
      Unable to load this product{{ error ? `: ${error.message}` : '.' }}
    </div>
    <template v-else>
      <ProductForm :product="product" :submitting="submitting" @submit="save" @cancel="router.push({ name: 'products' })" />
      <p v-if="mutationError" class="mutation-error">{{ mutationError }}</p>
    </template>
  </main>
</template>

<style scoped>
.page { min-height: 100vh; background: #f7f8fc; }
.message { padding: 100px 24px; color: #788196; text-align: center; }
.error, .mutation-error { color: #c94d5e; }
.mutation-error { margin: -58px auto 40px; max-width: 1000px; padding: 0 24px; }
</style>
