<template>
  <div class="min-h-screen" style="background:#faf7f2">
    <header style="background:#1c1917" class="px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
      <RouterLink to="/" class="flex items-center gap-3" style="text-decoration:none;">
        <img src="/logo.svg" alt="BookStore" class="w-9 h-9" />
        <span class="text-2xl font-bold tracking-wide" style="color:#faf7f2; font-family: 'Playfair Display', serif;">
          BookStore
        </span>
      </RouterLink>
      <nav class="flex items-center gap-6">
        <RouterLink to="/" class="text-sm hover:opacity-80 transition" style="color:#d6c9b8;">Home</RouterLink>
        <RouterLink to="/products" class="text-sm hover:opacity-80 transition" style="color:#d6c9b8;">Products</RouterLink>
        <RouterLink to="/auth" class="text-sm hover:opacity-80 transition" style="color:#d6c9b8;">Auth</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/admin" class="text-sm hover:opacity-80 transition" style="color:#d6c9b8;">Admin</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/orders" class="text-sm hover:opacity-80 transition" style="color:#d6c9b8;">Orders</RouterLink>
        <button v-if="isLoggedIn" @click="logout"
          class="text-xs px-3 py-1 rounded border transition"
          style="color:#d6c9b8; border-color:#78716c;">
          Logout
        </button>
        <button @click="toggleCart"
          class="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition"
          style="background:#b45309; color:#fff;">
          🛒 Cart ({{ cart.length }})
        </button>
      </nav>
    </header>

    <main class="px-8 py-8">
      <RouterView />
    </main>

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
