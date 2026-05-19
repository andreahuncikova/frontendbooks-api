<template>
  <div class="flex gap-8">
    <div class="flex-1">
      <h2 class="text-3xl font-bold mb-8" style="color:#1c1917; font-family:'Playfair Display',serif;">Order History</h2>

      <p v-if="orders.length === 0" class="text-center py-20 text-sm" style="color:#78716c;">No orders yet.</p>

      <div v-else>
        <div v-for="order in orders" :key="order._id"
          class="mb-6 rounded-xl p-6 shadow-sm"
          style="background:#fff8f0; border:1px solid #e7e5e4;">
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-xs font-mono" style="color:#78716c;">{{ order._id }}</p>
              <p class="text-sm mt-0.5" style="color:#78716c;">{{ order.orderDate }}</p>
            </div>
            <div class="flex items-center gap-3">
              <select v-model="order.orderStatus"
                class="px-3 py-1.5 rounded border text-sm"
                style="border-color:#e7e5e4; background:#faf7f2; color:#1c1917;">
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <button @click="archiveOrder(order._id)"
                class="px-3 py-1.5 rounded text-sm transition"
                style="background:#fee2e2; color:#b91c1c;">
                Archive
              </button>
            </div>
          </div>

          <div v-for="item in order.orderLine" :key="item.book._id"
            class="flex items-center gap-4 py-3" style="border-top:1px solid #e7e5e4;">
            <img :src="item.book.image" alt="" class="w-12 h-16 object-cover rounded">
            <div class="flex-1">
              <p class="font-semibold text-sm" style="color:#1c1917; font-family:'Playfair Display',serif;">{{ item.book.title }}</p>
              <p class="text-xs mt-0.5" style="color:#78716c;">Qty: {{ item.quantity }}</p>
            </div>
            <p class="font-bold text-sm" style="color:#b45309;">
              ${{ (calculateDiscountedPrice(item.book) * item.quantity).toFixed(2) }}
            </p>
          </div>

          <div class="flex justify-end mt-3 pt-3" style="border-top:1px solid #e7e5e4;">
            <p class="font-bold" style="color:#1c1917;">
              Order Total: <span style="color:#b45309;">${{ order.total.toFixed(2) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-64 shrink-0">
      <div class="rounded-xl p-6 sticky top-24" style="background:#fff8f0; border:1px solid #e7e5e4;">
        <h3 class="text-lg font-bold mb-2" style="color:#1c1917; font-family:'Playfair Display',serif;">Revenue</h3>
        <p class="text-xs mb-4" style="color:#78716c;">Shipped + Delivered orders only</p>
        <p class="text-3xl font-bold" style="color:#b45309;">${{ totalRevenue.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCart } from '@/modules/cart/useCart';
import type { Product } from '../../interfaces/interfaces';

const { orders } = useCart();

const archiveOrder = (orderId: string) => {
  orders.value = orders.value.filter(o => o._id !== orderId);
};

const calculateDiscountedPrice = (product: Product): number => {
  if (product.discount) return product.price * (1 - product.discount / 100);
  return product.price;
};

const totalRevenue = computed(() =>
  orders.value
    .filter(o => o.orderStatus !== 'Processing')
    .reduce((acc, order) =>
      acc + order.orderLine.reduce((s, item) =>
        s + calculateDiscountedPrice(item.book) * item.quantity, 0), 0)
);
</script>
