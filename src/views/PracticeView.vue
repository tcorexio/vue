<script setup lang="ts">
import { ref, computed, watch } from 'vue'

/*
  PRACTICE: computed và watch trong Vue 3

  Bài tập:
  1. Tạo computed fullName từ firstName và lastName.
  2. Tạo computed fullNameUppercase chuyển fullName thành chữ in hoa.
  3. Tạo computed cartTotal = tổng price * quantity của các sản phẩm.
  4. Tạo computed filteredProducts lọc theo searchText, không phân biệt hoa/thường.
  5. Watch searchText để cập nhật searchMessage:
       - rỗng: "Hãy nhập từ khóa tìm kiếm"
       - dưới 3 ký tự: "Nhập ít nhất 3 ký tự"
       - từ 3 ký tự: "Đang tìm: <từ khóa>"
  6. Watch quantity của sản phẩm đầu tiên trong cart; nếu < 1 thì đưa về 1.
  7. Watch đồng thời firstName và lastName để cập nhật nameChangedMessage.
  8. Nâng cao: dùng immediate: true để tạo thông báo tìm kiếm ngay lần đầu.

  Ghi nhớ:
  - computed dùng để tính ra giá trị, không sửa state bên trong computed.
  - watch dùng để thực hiện hành động khi dữ liệu thay đổi.
*/

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

const firstName = ref('Nguyen')
const lastName = ref('Trong')
const searchText = ref('')
const searchMessage = ref('')
const nameChangedMessage = ref('Chưa có thay đổi tên')

const cart = ref<Product[]>([
  { id: 1, name: 'Keyboard', price: 500000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 250000, quantity: 2 },
  { id: 3, name: 'Monitor', price: 2500000, quantity: 1 },
])

const products = ref<Product[]>([
  { id: 1, name: 'Keyboard', price: 500000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 250000, quantity: 1 },
  { id: 3, name: 'Monitor', price: 2500000, quantity: 1 },
  { id: 4, name: 'Webcam', price: 750000, quantity: 1 },
  { id: 5, name: 'Headphone', price: 600000, quantity: 1 },
])

const fullname = computed(() => firstName.value + lastName.value)

const fullnameUpper = fullname.value.toLocaleUpperCase()

const carttotal = computed<number>(() => {
  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

const productSearch = computed<Product[]>(() => {
  return products.value.filter((p) =>
    searchText.value.toLowerCase().includes(p.name.toLocaleLowerCase()),
  )
})

watch(searchText, (newValue) => {
  if (newValue === '') {
    searchMessage.value = 'Hãy nhập từ khóa tìm kiếm'
  } else if (newValue.length < 3) {
    searchMessage.value = 'Nhập ít nhất 3 ký tự'
  } else {
    searchMessage.value = `Đang tìm: ${newValue}`
  }
})

// TODO 1: computed fullName

// TODO 2: computed fullNameUppercase

// TODO 3: computed cartTotal

// TODO 4: computed filteredProducts

// TODO 5: watch searchText để cập nhật searchMessage

// TODO 6: watch quantity của sản phẩm đầu tiên trong cart.
// Nếu quantity < 1 thì đưa về 1.

// TODO 7: watch [firstName, lastName] để cập nhật nameChangedMessage

// TODO 8 (nâng cao): dùng immediate: true cho watch phù hợp.

// Hoàn thành các TODO rồi kiểm tra bằng giao diện bên dưới.
</script>

<template>
  <main class="practice">
    <header class="page-header">
      <p class="eyebrow">VUE 3 · PRACTICE</p>
      <h1>Computed & Watch</h1>
      <p>
        Hoàn thành các TODO trong phần <code>&lt;script setup&gt;</code>, sau đó thử thay đổi dữ
        liệu ở giao diện.
      </p>
    </header>

    <section class="panel">
      <h2>1. Computed — Tên người dùng</h2>
      <div class="form-grid">
        <label>
          First name
          <input v-model="firstName" placeholder="Nhập first name" />
        </label>
        <label>
          Last name
          <input v-model="lastName" placeholder="Nhập last name" />
        </label>
      </div>
      <div class="result">
        <p>
          Full name: <strong>{{ fullname }}</strong>
        </p>
        <p>
          Uppercase: <strong>{{ fullnameUpper }}</strong>
        </p>
        <p class="muted">{{ nameChangedMessage }}</p>
      </div>
    </section>

    <section class="panel">
      <h2>2. Computed — Giỏ hàng</h2>
      <div v-for="item in cart" :key="item.id" class="product-row">
        <div>
          <strong>{{ item.name }}</strong>
          <p class="muted">{{ item.price.toLocaleString('vi-VN') }} ₫ / sản phẩm</p>
        </div>
        <label class="quantity">
          Số lượng
          <input v-model.number="item.quantity" type="number" min="1" />
        </label>
      </div>
      <div class="total">Tổng tiền: {{ carttotal?.toLocaleString('vi-VN') }} ₫</div>
      <p class="muted">Thử nhập số lượng bằng 0 hoặc số âm để kiểm tra watch.</p>
    </section>

    <section class="panel">
      <h2>3. Computed + Watch — Tìm sản phẩm</h2>
      <label>
        Từ khóa
        <input v-model="searchText" placeholder="Ví dụ: key, mouse, monitor..." />
      </label>
      <p class="status">{{ searchMessage }}</p>
      <p class="muted">Số kết quả: {{ productSearch.length }}</p>
      <ul v-if="productSearch.length">
        <li v-for="product in productSearch" :key="product.id">
          {{ product.name }} — {{ product.price.toLocaleString('vi-VN') }} ₫
        </li>
      </ul>
      <p v-else>Không tìm thấy sản phẩm phù hợp.</p>
    </section>

    <footer class="footer-note">
      <strong>Gợi ý kiểm tra:</strong> đổi tên, đổi số lượng, tìm “key”, xóa từ khóa, rồi nhập từ
      khóa ngắn hơn 3 ký tự.
    </footer>
  </main>
</template>

<style scoped>
.practice {
  max-width: 850px;
  margin: 32px auto;
  padding: 0 20px 40px;
  color: #1f2937;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
.page-header {
  margin-bottom: 24px;
}
.eyebrow {
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
}
h1 {
  margin: 6px 0 8px;
  font-size: 30px;
}
h2 {
  margin: 0 0 16px;
  font-size: 18px;
}
.panel {
  margin: 16px 0;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 4px 14px rgb(15 23 42 / 4%);
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
}
input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font: inherit;
}
.result,
.status {
  margin-top: 14px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
}
.result p {
  margin: 4px 0;
}
.muted {
  color: #64748b;
  font-size: 13px;
}
.product-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.product-row p {
  margin: 5px 0 0;
}
.quantity {
  width: 130px;
  flex-shrink: 0;
}
.total {
  margin-top: 16px;
  text-align: right;
  font-size: 20px;
  font-weight: 750;
}
.status {
  color: #334155;
}
ul {
  padding-left: 22px;
  line-height: 1.9;
}
.footer-note {
  padding: 14px 2px;
  color: #475569;
  font-size: 13px;
}
@media (max-width: 560px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .product-row {
    align-items: flex-start;
  }
  .quantity {
    width: 100px;
  }
}
</style>
