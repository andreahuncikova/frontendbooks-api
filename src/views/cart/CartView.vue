<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold mb-8" style="color:#134e4a; font-family:'Playfair Display',serif;">Checkout</h2>

    <p v-if="cart.length === 0" class="text-center py-20 text-sm" style="color:#64748b;">
      Your cart is empty.
    </p>

    <div v-else>
      <div v-for="item in cart" :key="item._id"
        class="flex items-center gap-4 py-4" style="border-bottom:1px solid #d1faf5;">
        <img :src="item.image" alt="" class="w-16 h-20 object-cover rounded">
        <div class="flex-1">
          <p class="font-semibold" style="color:#134e4a; font-family:'Playfair Display',serif;">{{ item.title }}</p>
          <div class="flex items-center gap-2 mt-2">
            <button @click="updateQuantity(item._id, item.quantity - 1)"
              class="w-6 h-6 rounded text-sm"
              style="background:#d1faf5; color:#134e4a;">−</button>
            <span class="text-sm" style="color:#134e4a;">{{ item.quantity }}</span>
            <button @click="updateQuantity(item._id, item.quantity + 1)"
              class="w-6 h-6 rounded text-sm"
              style="background:#d1faf5; color:#134e4a;">+</button>
          </div>
        </div>
        <p class="font-bold" style="color:#0d9488;">${{ (item.price * item.quantity).toFixed(2) }}</p>
      </div>

      <div class="mt-6 pt-4" style="border-top:2px solid #d1faf5;">
        <div class="flex justify-between text-sm mb-2">
          <span style="color:#64748b;">Subtotal</span>
          <span style="color:#134e4a;">${{ cartTotal().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <span style="color:#64748b;">Sales Tax (10%)</span>
          <span style="color:#134e4a;">${{ salesTax().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm mb-4">
          <span style="color:#64748b;">Coupon Code</span>
          <input type="text" placeholder="Enter code" v-model="code"
            class="px-2 py-1 rounded border text-sm text-right w-28"
            style="border-color:#d1faf5; background:#ffffff; color:#134e4a;">
        </div>
        <div class="flex justify-between font-bold text-lg mb-6">
          <span style="color:#134e4a;">Grand Total</span>
          <span style="color:#0d9488;">${{ grandTotal().toFixed(2) }}</span>
        </div>
        <div class="flex justify-end">
          <button @click="checkOutBuy()"
            class="px-8 py-3 rounded font-semibold transition"
            style="background:#0d9488; color:#fff;">
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
