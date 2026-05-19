<template>
  <transition name="fade-slide">
    <div v-if="isVisible" @click.self="toggleCart"
      class="fixed inset-0 flex justify-end z-50"
      style="background:rgba(28,25,23,0.5);">
      <div @click.stop class="h-full w-96 overflow-y-auto flex flex-col shadow-2xl"
        style="background:#fff8f0; border-left:1px solid #e7e5e4;">

        <div class="flex items-center justify-between px-6 py-4" style="border-bottom:1px solid #e7e5e4;">
          <h2 class="text-xl font-bold" style="color:#1c1917; font-family:'Playfair Display',serif;">Your Cart</h2>
          <button @click="toggleCart" class="text-3xl leading-none" style="color:#78716c;">&times;</button>
        </div>

        <div class="flex-1 px-6 py-4">
          <p v-if="cart.length === 0" class="text-center py-12 text-sm" style="color:#78716c;">
            Your cart is empty
          </p>
          <div v-for="item in cart" :key="item._id" class="flex gap-4 pb-4 mb-4" style="border-bottom:1px solid #e7e5e4;">
            <img :src="item.image" alt="" class="w-16 h-20 object-cover rounded">
            <div class="flex-1">
              <p class="font-semibold text-sm leading-snug" style="color:#1c1917; font-family:'Playfair Display',serif;">{{ item.title }}</p>
              <p class="text-xs mt-0.5" style="color:#78716c;">${{ item.price.toFixed(2) }} each</p>
              <div class="flex items-center gap-2 mt-2">
                <button @click="updateQuantity(item._id, item.quantity - 1)"
                  class="w-6 h-6 rounded text-sm font-bold"
                  style="background:#e7e5e4; color:#1c1917;">−</button>
                <span class="text-sm font-semibold" style="color:#1c1917;">{{ item.quantity }}</span>
                <button @click="updateQuantity(item._id, item.quantity + 1)"
                  class="w-6 h-6 rounded text-sm font-bold"
                  style="background:#e7e5e4; color:#1c1917;">+</button>
              </div>
            </div>
            <p class="text-sm font-bold self-start pt-1" style="color:#b45309;">
              ${{ cartTotalIndividualProduct(item._id).toFixed(2) }}
            </p>
          </div>
        </div>

        <div class="px-6 py-4" style="border-top:1px solid #e7e5e4; background:#faf7f2;">
          <div class="flex justify-between text-sm mb-1">
            <span style="color:#78716c;">Subtotal</span>
            <span style="color:#1c1917;">${{ cartTotal().toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <span style="color:#78716c;">Sales tax (10%)</span>
            <span style="color:#1c1917;">${{ salesTax() }}</span>
          </div>
          <div class="flex justify-between items-center text-sm mb-3">
            <span style="color:#78716c;">Coupon</span>
            <input type="text" placeholder="Enter code" v-model="code"
              class="px-2 py-1 rounded border text-sm text-right w-28"
              style="border-color:#e7e5e4; background:#fff8f0; color:#1c1917;">
          </div>
          <div class="flex justify-between font-bold text-base mb-4">
            <span style="color:#1c1917;">Grand Total</span>
            <span style="color:#b45309;">${{ grandTotal() }}</span>
          </div>
          <button @click="checkOutBuy"
            class="w-full py-3 rounded font-semibold transition"
            style="background:#b45309; color:#fff;">
            Checkout →
          </button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCart } from '../../modules/cart/useCart';
import { useRouter } from 'vue-router';
const isVisible = defineModel<boolean>('isVisible');
const toggleCart = () => { isVisible.value = !isVisible.value; };
const { cart, updateQuantity, cartTotal, cartTotalIndividualProduct, salesTax, grandTotal, code } = useCart();
const router = useRouter();
const checkOutBuy = () => { router.push('/cart'); isVisible.value = false; };
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: opacity 0.3s; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; }
</style>
