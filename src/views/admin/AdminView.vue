<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div>                             <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500"> {{ error }}</div>                         <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2">                                    <!-- add new product section -->
    <div class="my-8 p-2 w-full">
      <h2 class="text-2xl font-semibold mb-4">Add Product</h2>
      <form @submit.prevent="addProductHandler">                                                               <!-- Add product form -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="newProduct.title" type="text" placeholder="Name" class="p-2 border rounded" />    
          <input v-model="newProduct.author" type="text" placeholder="Author" class="p-2 border rounded" /> <!-- ✅ pridaj tu -->     <!-- Product name -->
          <span  class="absolute text-red-500 text-xs ml-2">Can't be empty</span> <!-- Error message & validate -->

          <input v-model="newProduct.summary" type="text" placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Price: </span>
            <input v-model="newProduct.price" type="number"  placeholder="Price" class=" pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Stock: </span>
            <input type="checkbox" v-model="newProduct.available" class="border rounded w-6 h-6 mr-2" />
          <span class="uppercase font-bold">Available</span>
          </div>
          <div class="p-2 border rounded flex items-center">

            <input v-model="newProduct.hasDiscount" type="checkbox" class="border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Discount in %:</span> <!-- Discount in % -->
            <input v-model="newProduct.discount" type="number" placeholder="Discount %" class=" ml-2 pl-2 " /> <!-- Discount % -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input v-model="newProduct.hidden" type="checkbox" class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Hidden product</span> <!-- Hidden product -->
          </div>
          <input v-model="newProduct.image" type="text" placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->

        </div>
        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>

    <!-- Edit existing products -->
    <div class="my-8 p-2 w-full">

      <h2 class="text-2xl font-semibold mb-4">Products</h2>
      <div v-for="product in products" :key="product._id" class="mb-4 p-4 border rounded bg-[#181818]"> <!-- Loop through the products -->
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="product.title"  placeholder="Name" class="p-2 border rounded" /> <!-- Product name -->
          <input type="text" v-model="product.summary"  placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Price: </span>
            <input type="number" v-model="product.price" placeholder="Price" class=" pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Stock: </span>
            <input type="checkbox" v-model="product.available" class="border rounded w-6 h-6 mr-2" />
          <span class="uppercase font-bold">Available</span>
          </div>
          <div class="p-2 border rounded flex items-center">

            <input type="checkbox" v-model="product.hasDiscount" class="border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Discount in %:</span> <!-- Discount in % -->
            <input type="number" v-model="product.discount" placeholder="Discount %" class=" ml-2 pl-2 " /> <!-- Discount % -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="product.hidden"  class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Hidden product</span> <!-- Hidden product -->
          </div>
          <input type="text" v-model="product.image"  placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->
          <span>
            Thumbnail img: <img :src="product.image" alt="Product Image" class="w-full h-24 w-24 object-cover mb-4 rounded-lg"> <!-- Product image -->
          </span>
        </div>

        <div class="mt-4 flex space-x-2"> <!-- Update and delete buttons -->
          <p>ID:  </p> <!-- Product ID for testing -->
          <button  class="bg-red-600 text-white p-2 rounded hover:bg-red-700" @click="deleteProduct(product._id)">Delete</button> <!-- Delete button -->
          <button  class="bg-green-600 text-white p-2 rounded hover:bg-green-700" @click="updateProductHandler(product)">Edit</button> <!-- Edit button -->
         </div>
      </div>
    </div>
  </div>
     <!-- Custom confirmation dialog -->

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
    newProduct.value = {
      ...newProduct.value,
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
  }



</script>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696 ;
}

input[type=checkbox] {
  accent-color: var(--input-field-color);
}

</style>
