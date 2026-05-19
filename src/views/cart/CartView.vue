<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold mb-8" style="color:#1c1917; font-family:Georgia,serif;">Checkout</h2>

    <p v-if="cart.length === 0" class="text-center py-20 text-sm" style="color:#78716c;">
      Your cart is empty.
    </p>

    <div v-else>
      <div v-for="item in cart" :key="item._id"
        class="flex items-center gap-4 py-4" style="border-bottom:1px solid #e7e5e4;">
        <img :src="item.image" alt="" class="w-16 h-20 object-cover rounded">
        <div class="flex-1">
          <p class="font-semibold" style="color:#1c1917; font-family:Georgia,serif;">{{ item.title }}</p>
          <div class="flex items-center gap-2 mt-2">
            <button @click="updateQuantity(item._id, item.quantity - 1)"
              class="w-6 h-6 rounded text-sm"
              style="background:#e7e5e4; color:#1c1917;">−</button>
            <span class="text-sm" style="color:#1c1917;">{{ item.quantity }}</span>
            <button @click="updateQuantity(item._id, item.quantity + 1)"
              class="w-6 h-6 rounded text-sm"
              style="background:#e7e5e4; color:#1c1917;">+</button>
          </div>
        </div>
        <p class="font-bold" style="color:#b45309;">${{ (item.price * item.quantity).toFixed(2) }}</p>
      </div>

      <div class="mt-6 pt-4" style="border-top:2px solid #e7e5e4;">
        <div class="flex justify-between text-sm mb-2">
          <span style="color:#78716c;">Subtotal</span>
          <span style="color:#1c1917;">${{ cartTotal().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <span style="color:#78716c;">Sales Tax (10%)</span>
          <span style="color:#1c1917;">${{ salesTax().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm mb-4">
          <span style="color:#78716c;">Coupon Code</span>
          <input type="text" placeholder="Enter code" v-model="code"
            class="px-2 py-1 rounded border text-sm text-right w-28"
            style="border-color:#e7e5e4; background:#fff8f0; color:#1c1917;">
        </div>
        <div class="flex justify-between font-bold text-lg mb-6">
          <span style="color:#1c1917;">Grand Total</span>
          <span style="color:#b45309;">${{ grandTotal().toFixed(2) }}</span>
        </div>
        <div class="flex justify-end">
          <button @click="checkOutBuy()"
            class="px-8 py-3 rounded font-semibold transition"
            style="background:#b45309; color:#fff;">
            Place Order →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/modules/cart/useCart';
const { cart, code, updateQuantity, cartTotal, salesTax, grandTotal, checkOutBuy } = useCart();
</script>
