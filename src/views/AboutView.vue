<template>
  <div class="max-w-3xl mx-auto py-12 px-4">
    <p class="text-sm uppercase tracking-widest mb-3" style="color:#f59e0b;">Our story</p>
    <h1 class="text-5xl font-bold mb-6" style="color:#1c1917; font-family:'Montserrat',sans-serif; line-height:1.1;">
      A place for every reader
    </h1>
    <p class="text-lg leading-relaxed mb-12" style="color:#64748b; font-family:'Montserrat',sans-serif;">
      BookStore was built for people who believe that the right book at the right time can change everything.
      We curate titles across every genre — from gripping mysteries to timeless classics — so you can
      spend less time searching and more time reading.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
      <div class="rounded-xl p-6" style="background:#ffffff; border:1px solid #fde68a;">
        <p class="text-3xl font-bold mb-1" style="color:#f59e0b;">500+</p>
        <p class="text-sm" style="color:#64748b;">Books in our collection</p>
      </div>
      <div class="rounded-xl p-6" style="background:#ffffff; border:1px solid #fde68a;">
        <p class="text-3xl font-bold mb-1" style="color:#f59e0b;">20+</p>
        <p class="text-sm" style="color:#64748b;">Genres covered</p>
      </div>
      <div class="rounded-xl p-6" style="background:#ffffff; border:1px solid #fde68a;">
        <p class="text-3xl font-bold mb-1" style="color:#f59e0b;">Free</p>
        <p class="text-sm" style="color:#64748b;">Delivery on orders over $30</p>
      </div>
    </div>

    <div class="pt-10 mb-12" style="border-top:1px solid #fde68a;">
      <h2 class="text-2xl font-bold mb-4" style="color:#1c1917; font-family:'Montserrat',sans-serif;">Built with</h2>
      <div class="flex flex-wrap gap-3">
        <span v-for="tech in stack" :key="tech"
          class="px-3 py-1.5 rounded-full text-sm font-semibold"
          style="background:#f3f4f6; color:#374151;">
          {{ tech }}
        </span>
      </div>
    </div>

    <div class="rounded-xl p-8 text-center" style="background:#fef9c3; border:2px solid #fde047;">
      <h2 class="text-2xl font-bold mb-2" style="color:#1c1917; font-family:'Montserrat',sans-serif;">
        Ready to find your next read?
      </h2>
      <p class="text-sm mb-6" style="color:#78716c;">Browse our full collection and add to your cart instantly.</p>
      <RouterLink to="/products"
        class="inline-block px-8 py-3 rounded font-semibold text-sm transition"
        style="background:#f59e0b; color:#fff;">
        Browse Books →
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const stack = ['Vue 3', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Playwright', 'GitHub Actions'];
</script>
