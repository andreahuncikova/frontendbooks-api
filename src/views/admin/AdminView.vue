<template>
  <div>
    <h1 class="text-3xl font-bold mb-8" style="color:#134e4a; font-family:'Playfair Display',serif;">Admin Panel</h1>

    <div v-if="actionMessage" class="mb-6 px-4 py-3 rounded text-sm font-semibold"
      :style="actionMessage.success ? 'background:#dcfce7; color:#15803d;' : 'background:#fee2e2; color:#b91c1c;'">
      {{ actionMessage.text }}
    </div>

    <div v-if="loading" class="text-center py-12 text-sm" style="color:#64748b;">Loading...</div>
    <div v-else-if="error" class="text-center py-12 text-red-600">{{ error }}</div>

    <div v-else>
      <!-- Add Product -->
      <div class="rounded-xl p-6 mb-10 shadow-sm" style="background:#ffffff; border:1px solid #d1faf5;">
        <h2 class="text-xl font-bold mb-6" style="color:#134e4a; font-family:'Playfair Display',serif;">Add New Book</h2>
        <form @submit.prevent="addProductHandler">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input v-model="newProduct.title" type="text" placeholder="Title"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
            <input v-model="newProduct.author" type="text" placeholder="Author"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
            <input v-model="newProduct.summary" type="text" placeholder="Description"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
            <input v-model="newProduct.price" type="number" placeholder="Price"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
            <input v-model="newProduct.image" type="text" placeholder="Image URL"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none col-span-full"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
            <div class="flex flex-wrap gap-4 items-center px-4 py-2.5 rounded border col-span-full"
              style="border-color:#d1faf5; background:#f0fafb;">
              <label class="flex items-center gap-2 text-sm" style="color:#64748b;">
                <input type="checkbox" v-model="newProduct.available" class="w-4 h-4" style="accent-color:#0d9488;" />
                Available
              </label>
              <label class="flex items-center gap-2 text-sm" style="color:#64748b;">
                <input type="checkbox" v-model="newProduct.hidden" class="w-4 h-4" style="accent-color:#0d9488;" />
                Hidden
              </label>
              <label class="flex items-center gap-2 text-sm" style="color:#64748b;">
                <input type="checkbox" v-model="newProduct.hasDiscount" class="w-4 h-4" style="accent-color:#0d9488;" />
                Discount %:
              </label>
              <input v-model="newProduct.discount" type="number" placeholder="0"
                class="w-16 px-2 py-1 rounded border text-sm"
                style="border-color:#d1faf5; background:#ffffff; color:#134e4a;" />
            </div>
          </div>
          <button type="submit"
            class="px-6 py-2.5 rounded font-semibold text-sm transition"
            style="background:#0d9488; color:#fff;">
            Create Book
          </button>
        </form>
      </div>

      <!-- Existing Products -->
      <h2 class="text-xl font-bold mb-4" style="color:#134e4a; font-family:'Playfair Display',serif;">All Books</h2>
      <div v-for="product in products" :key="product._id"
        class="rounded-xl p-5 mb-4 shadow-sm"
        style="background:#ffffff; border:1px solid #d1faf5;">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input type="text" v-model="product.title" placeholder="Title"
            class="px-4 py-2 rounded border text-sm"
            style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
          <input type="text" v-model="product.summary" placeholder="Description"
            class="px-4 py-2 rounded border text-sm"
            style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
          <input type="number" v-model="product.price" placeholder="Price"
            class="px-4 py-2 rounded border text-sm"
            style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
          <input type="text" v-model="product.image" placeholder="Image URL"
            class="px-4 py-2 rounded border text-sm"
            style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;" />
          <div class="flex flex-wrap gap-4 items-center px-4 py-2 rounded border"
            style="border-color:#d1faf5; background:#f0fafb;">
            <label class="flex items-center gap-2 text-sm" style="color:#64748b;">
              <input type="checkbox" v-model="product.available" class="w-4 h-4" style="accent-color:#0d9488;" />
              Available
            </label>
            <label class="flex items-center gap-2 text-sm" style="color:#64748b;">
              <input type="checkbox" v-model="product.hidden" class="w-4 h-4" style="accent-color:#0d9488;" />
              Hidden
            </label>
            <label class="flex items-center gap-2 text-sm" style="color:#64748b;">
              <input type="checkbox" v-model="product.hasDiscount" class="w-4 h-4" style="accent-color:#0d9488;" />
              Discount %:
            </label>
            <input type="number" v-model="product.discount" placeholder="0"
              class="w-16 px-2 py-1 rounded border text-sm"
              style="border-color:#d1faf5; background:#ffffff; color:#134e4a;" />
          </div>
          <div class="flex items-center gap-3">
            <img :src="product.image" alt="" class="w-12 h-16 object-cover rounded">
            <span class="text-xs" style="color:#64748b;">Preview</span>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="updateProductHandler(product)"
            class="px-4 py-2 rounded text-sm font-semibold transition"
            style="background:#0d9488; color:#fff;">
            Save
          </button>
          <button @click="deleteProductHandler(product._id)"
            class="px-4 py-2 rounded text-sm font-semibold transition"
            style="background:#fee2e2; color:#b91c1c;">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useProducts } from '../../modules/useProducts';
  import type { Product } from '../../interfaces/interfaces';

  const { products, error, loading, fetchProducts, deleteProduct, addProduct, getTokenAndUserId, updateProduct } = useProducts();

  onMounted(() => {
    fetchProducts();
  });

  const actionMessage = ref<{ text: string; success: boolean } | null>(null);
  const showMessage = (text: string, success: boolean) => {
    actionMessage.value = { text, success };
    setTimeout(() => { actionMessage.value = null; }, 3000);
  };

  const newProduct = ref({
    title: '',
    author: '',
    summary: '',
    price: 0,
    genre: '',
    publishedYear: 0,
    pages: 0,
    available: false,
    hasDiscount: false,
    discount: 0,
    hidden: false,
    image: '',
    _createdBy: '',
  });

  const addProductHandler = async () => {
    const { userId } = getTokenAndUserId();
    newProduct.value._createdBy = userId;
    await addProduct(newProduct.value);
    if (error.value) {
      showMessage(error.value, false);
    } else {
      showMessage('Book created successfully', true);
      newProduct.value = { title: '', author: '', summary: '', price: 0, genre: '', publishedYear: 0, pages: 0, available: false, hasDiscount: false, discount: 0, hidden: false, image: '', _createdBy: '' };
    }
  }

  const updateProductHandler = async (product: Product) => {
    const updatedProduct = {
      title: product.title,
      author: product.author,
      summary: product.summary,
      price: product.price,
      genre: product.genre,
      publishedYear: product.publishedYear,
      pages: product.pages,
      available: product.available,
      hasDiscount: product.hasDiscount,
      discount: product.discount,
      hidden: product.hidden,
      image: product.image,
      _createdBy: product._createdBy,
    };
    await updateProduct(product._id, updatedProduct);
    if (error.value) showMessage(error.value, false);
    else showMessage('Book updated successfully', true);
  }

  const deleteProductHandler = async (id: string) => {
    await deleteProduct(id);
    if (error.value) showMessage(error.value, false);
    else showMessage('Book deleted', true);
  }
</script>

<style scoped>
</style>
