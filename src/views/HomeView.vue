<template>
  <div class="flex flex-col items-center justify-center text-center py-24 px-4">
    <p class="text-sm uppercase tracking-widest mb-4" style="color:#0d9488;">Welcome to our store</p>
    <h1 class="text-6xl font-bold mb-6" style="color:#134e4a; font-family: 'Playfair Display', serif; line-height:1.1;">
      Find your next<br>favourite book
    </h1>
    <p class="text-lg max-w-lg mb-10" style="color:#64748b; font-family: 'Playfair Display', serif;">
      Handpicked titles across every genre. Browse, add to cart, and get reading.
    </p>
    <RouterLink
      to="/products"
      class="px-8 py-3 rounded font-semibold text-base transition shadow"
      style="background:#0d9488; color:#fff;">
      Browse Books →
    </RouterLink>
    <div class="mt-20 grid grid-cols-3 gap-12 text-center">
      <div>
        <p class="text-4xl font-bold" style="color:#0d9488;">500+</p>
        <p class="text-sm mt-1" style="color:#64748b;">Books available</p>
      </div>
      <div>
        <p class="text-4xl font-bold" style="color:#0d9488;">20+</p>
        <p class="text-sm mt-1" style="color:#64748b;">Genres</p>
      </div>
      <div>
        <p class="text-4xl font-bold" style="color:#0d9488;">Free</p>
        <p class="text-sm mt-1" style="color:#64748b;">Delivery on orders $30+</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
