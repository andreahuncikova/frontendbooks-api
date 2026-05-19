<template>
  <div class="min-h-screen" style="background:#ffffff">
    <header style="background:#fefce8; border-bottom:2px solid #fde047;" class="px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <RouterLink to="/" class="flex items-center gap-3" style="text-decoration:none;">
        <img src="/logo.svg" alt="BookStore" class="w-9 h-9" />
        <span class="text-2xl font-bold tracking-wide" style="color:#374151; font-family: 'Montserrat', sans-serif;">
          BookStore
        </span>
      </RouterLink>
      <nav class="flex items-center gap-6">
        <RouterLink to="/" class="text-sm hover:opacity-60 transition" style="color:#78716c;">Home</RouterLink>
        <RouterLink to="/products" class="text-sm hover:opacity-60 transition" style="color:#78716c;">Products</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/orders" class="text-sm hover:opacity-60 transition" style="color:#78716c;">Orders</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/admin" class="text-sm hover:opacity-60 transition" style="color:#78716c;">Admin</RouterLink>
        <RouterLink to="/auth" class="text-sm hover:opacity-60 transition" style="color:#78716c;">Sign In</RouterLink>
        <button v-if="isLoggedIn" @click="logout"
          class="text-xs px-3 py-1 rounded border transition"
          style="color:#374151; border-color:#fde68a;">
          Logout
        </button>
        <button @click="toggleCart"
          class="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition"
          style="background:#f59e0b; color:#fff;">
          🛒 Cart ({{ cart.length }})
        </button>
      </nav>
    </header>

    <main class="px-8 py-8 min-h-screen">
      <RouterView />
    </main>

    <footer style="background:#ffffff; border-top:2px solid #fde047; margin: 0rem 3rem;" class="mt-16 px-8 py-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <img src="/logo.svg" alt="BookStore" class="w-7 h-7" />
          <span class="font-bold" style="color:#1c1917; font-family:'Montserrat',sans-serif;">BookStore</span>
        </div>
        <nav class="flex gap-6">
          <RouterLink to="/" class="text-xs hover:opacity-60 transition" style="color:#78716c;">Home</RouterLink>
          <RouterLink to="/products" class="text-xs hover:opacity-60 transition" style="color:#78716c;">Products</RouterLink>
          <RouterLink to="/about" class="text-xs hover:opacity-60 transition" style="color:#78716c;">About</RouterLink>
          <RouterLink to="/auth" class="text-xs hover:opacity-60 transition" style="color:#78716c;">Sign In</RouterLink>
        </nav>
        <p class="text-xs" style="color:#374151;">© {{ new Date().getFullYear() }} BookStore</p>
      </div>
    </footer>

    <CartBasket v-model="isCartOpen" :isVisible="isCartOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useUsers } from './modules/auth/useUsers';
import { state } from './modules/globalState/state';
import { useCart } from './modules/cart/useCart';
import CartBasket from './components/cart/CartBasketView.vue';

const isCartOpen = ref(false);
const toggleCart = () => { isCartOpen.value = !isCartOpen.value; };
const { logout } = useUsers();
const { cart } = useCart();
const isLoggedIn = computed(() => state.isLoggedIn);
</script>
