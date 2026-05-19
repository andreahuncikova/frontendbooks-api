<template>
  <div class="min-h-screen" style="background:#f0fafb">
    <header style="background:#134e4a" class="px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
      <RouterLink to="/" class="flex items-center gap-3" style="text-decoration:none;">
        <img src="/logo.svg" alt="BookStore" class="w-9 h-9" />
        <span class="text-2xl font-bold tracking-wide" style="color:#f0fafb; font-family: 'Playfair Display', serif;">
          BookStore
        </span>
      </RouterLink>
      <nav class="flex items-center gap-6">
        <RouterLink to="/" class="text-sm hover:opacity-80 transition" style="color:#a7f3d0;">Home</RouterLink>
        <RouterLink to="/products" class="text-sm hover:opacity-80 transition" style="color:#a7f3d0;">Products</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/orders" class="text-sm hover:opacity-80 transition" style="color:#a7f3d0;">Orders</RouterLink>
                <RouterLink v-if="isLoggedIn" to="/admin" class="text-sm hover:opacity-80 transition" style="color:#a7f3d0;">Admin</RouterLink>
                <RouterLink to="/auth" class="text-sm hover:opacity-80 transition" style="color:#a7f3d0;">Sign In</RouterLink>
        <button v-if="isLoggedIn" @click="logout"
          class="text-xs px-3 py-1 rounded border transition"
          style="color:#a7f3d0; border-color:#64748b;">
          Logout
        </button>
        <button @click="toggleCart"
          class="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition"
          style="background:#0d9488; color:#fff;">
          🛒 Cart ({{ cart.length }})
        </button>
      </nav>
    </header>

    <main class="px-8 py-8">
      <RouterView />
    </main>

    <footer style="background:#134e4a; border-top:1px solid #2d2d2d;" class="mt-16 px-8 py-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <img src="/logo.svg" alt="BookStore" class="w-7 h-7" />
          <span class="font-bold" style="color:#f0fafb; font-family:'Playfair Display',serif;">BookStore</span>
        </div>
        <nav class="flex gap-6">
          <RouterLink to="/" class="text-xs hover:opacity-80 transition" style="color:#a7f3d0;">Home</RouterLink>
          <RouterLink to="/products" class="text-xs hover:opacity-80 transition" style="color:#a7f3d0;">Products</RouterLink>
          <RouterLink to="/about" class="text-xs hover:opacity-80 transition" style="color:#a7f3d0;">About</RouterLink>
          <RouterLink to="/auth" class="text-xs hover:opacity-80 transition" style="color:#a7f3d0;">Sign In</RouterLink>
        </nav>
        <p class="text-xs" style="color:#a7f3d0;">© {{ new Date().getFullYear() }} BookStore</p>
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
