<template>
  <div>
    <div class="mb-8 pb-4 border-b" style="border-color:#e7e5e4;">
      <h2 class="text-3xl font-bold" style="color:#1c1917; font-family: 'Playfair Display', serif;">All Books</h2>
      <p class="mt-1 text-sm" style="color:#78716c;">{{ products.length }} titles in our collection</p>
    </div>

    <div v-if="loading" class="text-center py-20 text-sm" style="color:#78716c;">Loading...</div>
    <div v-else-if="error" class="text-center py-20">
      <p class="text-sm mb-4" style="color:#78716c;">{{ error }}</p>
      <button @click="fetchProducts()"
        class="px-5 py-2 rounded text-sm font-semibold transition"
        style="background:#b45309; color:#fff;">
        Retry
      </button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product._id"
        class="rounded-xl overflow-hidden shadow-sm flex flex-col transition hover:shadow-md"
        style="background:#fff8f0; border:1px solid #e7e5e4;">
        <img :src="product.image" :alt="product.title" class="w-full h-52 object-cover">
        <div class="p-4 flex flex-col flex-1">
          <span class="text-xs font-semibold uppercase tracking-wide mb-1" style="color:#b45309;">
            {{ product.genre }}
          </span>
          <h3 class="font-bold text-base mb-0.5 leading-snug" style="color:#1c1917; font-family: 'Playfair Display', serif;">
            {{ product.title }}
          </h3>
          <p class="text-sm mb-2" style="color:#78716c;">by {{ product.author }}</p>
          <p class="text-sm flex-1 leading-relaxed line-clamp-2" style="color:#a8a29e;">{{ product.summary }}</p>
          <div class="flex items-center justify-between mt-4 pt-3" style="border-top:1px solid #e7e5e4;">
            <span class="text-lg font-bold" style="color:#1c1917;">${{ product.price.toFixed(2) }}</span>
            <button @click="addToCart(product)"
              class="px-4 py-1.5 rounded text-sm font-semibold transition"
              style="background:#b45309; color:#fff;">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '../modules/useProducts'
import { useCart } from '../modules/cart/useCart'

const { addToCart } = useCart()
const { loading, error, products, fetchProducts } = useProducts()
onMounted(() => { fetchProducts() })
</script>
