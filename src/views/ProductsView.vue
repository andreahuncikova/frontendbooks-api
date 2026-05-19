<template>
  <div>
    <div class="mb-6 pb-4 border-b" style="border-color:#fde68a;">
      <h2 class="text-3xl font-bold" style="color:#1c1917; font-family: 'Montserrat', sans-serif;">All Books</h2>
      <p class="mt-1 text-sm" style="color:#64748b;">{{ filtered.length }} of {{ products.length }} titles</p>
    </div>

    <!-- Search + filter bar -->
    <div class="mb-6 flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style="color:#94a3b8;">🔍</span>
        <input
          v-model="search"
          type="text"
          placeholder="Search by title or author..."
          class="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none"
          style="border-color:#fde68a; background:#ffffff; color:#1c1917;"
        />
      </div>
      <button
        v-if="search || activeGenre"
        @click="search = ''; activeGenre = ''"
        class="px-4 py-2.5 rounded-lg text-sm transition"
        style="background:#f3f4f6; color:#374151;">
        Clear
      </button>
    </div>

    <!-- Genre chips -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        @click="activeGenre = ''"
        class="px-3 py-1 rounded-full text-xs font-semibold transition"
        :style="activeGenre === '' ? 'background:#f59e0b; color:#fff;' : 'background:#f3f4f6; color:#374151;'">
        All
      </button>
      <button
        v-for="genre in genres"
        :key="genre"
        @click="activeGenre = activeGenre === genre ? '' : genre"
        class="px-3 py-1 rounded-full text-xs font-semibold transition"
        :style="activeGenre === genre ? 'background:#f59e0b; color:#fff;' : 'background:#f3f4f6; color:#374151;'">
        {{ genre }}
      </button>
    </div>

    <div v-if="loading" class="text-center py-20 text-sm" style="color:#64748b;">Loading...</div>
    <div v-else-if="error" class="text-center py-20">
      <p class="text-sm mb-4" style="color:#64748b;">{{ error }}</p>
      <button @click="fetchProducts()"
        class="px-5 py-2 rounded text-sm font-semibold transition"
        style="background:#f59e0b; color:#fff;">
        Retry
      </button>
    </div>

    <div v-else-if="filtered.length === 0" class="text-center py-20">
      <p class="text-4xl mb-4">📚</p>
      <p class="font-semibold mb-1" style="color:#1c1917;">No books found</p>
      <p class="text-sm" style="color:#64748b;">Try a different search or filter</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in filtered" :key="product._id"
        class="rounded-xl overflow-hidden shadow-sm flex flex-col transition hover:shadow-md hover:-translate-y-1"
        style="background:#ffffff; border:1px solid #fde68a; transition: box-shadow 0.2s, transform 0.2s;">
        <img :src="product.image" :alt="product.title" class="w-full h-52 object-cover">
        <div class="p-4 flex flex-col flex-1">
          <span class="text-xs font-semibold uppercase tracking-wide mb-1" style="color:#f59e0b;">
            {{ product.genre }}
          </span>
          <h3 class="font-bold text-base mb-0.5 leading-snug" style="color:#1c1917; font-family: 'Montserrat', sans-serif;">
            {{ product.title }}
          </h3>
          <p class="text-sm mb-2" style="color:#64748b;">by {{ product.author }}</p>
          <p class="text-sm flex-1 leading-relaxed line-clamp-2" style="color:#94a3b8;">{{ product.summary }}</p>
          <div class="flex items-center justify-between mt-4 pt-3" style="border-top:1px solid #fde68a;">
            <span class="text-lg font-bold" style="color:#1c1917;">${{ product.price.toFixed(2) }}</span>
            <button
              @click="addToCart(product)"
              :disabled="!product.available"
              class="px-4 py-1.5 rounded text-sm font-semibold transition"
              :style="product.available ? 'background:#f59e0b; color:#fff;' : 'background:#f3f4f6; color:#374151; cursor:not-allowed;'">
              {{ product.available ? 'Add to Cart' : 'Unavailable' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useProducts } from '../modules/useProducts'
import { useCart } from '../modules/cart/useCart'

const { addToCart } = useCart()
const { loading, error, products, fetchProducts } = useProducts()

const search = ref('')
const activeGenre = ref('')

const genres = computed(() => {
  const all = products.value.map(p => p.genre).filter(Boolean)
  return [...new Set(all)].sort()
})

const filtered = computed(() => {
  let result = products.value
  if (activeGenre.value) {
    result = result.filter(p => p.genre === activeGenre.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    )
  }
  return result
})

onMounted(() => { fetchProducts() })
</script>
