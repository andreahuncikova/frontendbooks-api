<template>
  <div class="flex min-h-[80vh]">
    <!-- Left: image -->
    <div class="hidden md:block w-1/2 bg-cover bg-center rounded-xl overflow-hidden"
      style="background-image: url('https://picsum.photos/800/1200');"></div>

    <!-- Right: forms -->
    <div class="w-full md:w-1/2 flex flex-col justify-center px-12 py-10">
      <!-- Login -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold mb-1" style="color:#1c1917; font-family: Georgia, serif;">Sign in</h2>
        <p class="text-sm mb-6" style="color:#78716c;">Welcome back to BookStore</p>
        <input type="text" placeholder="Email"
          class="block w-full mb-3 px-4 py-2.5 rounded border text-sm focus:outline-none"
          style="border-color:#e7e5e4; background:#fff8f0; color:#1c1917;"
          v-model="email" />
        <input type="password" placeholder="Password"
          class="block w-full mb-4 px-4 py-2.5 rounded border text-sm focus:outline-none"
          style="border-color:#e7e5e4; background:#fff8f0; color:#1c1917;"
          v-model="password" />
        <button @click="fetchToken(email, password)"
          class="w-full py-2.5 rounded font-semibold text-sm transition mb-2"
          style="background:#b45309; color:#fff;">
          Login
        </button>
        <button @click="logout()"
          class="w-full py-2.5 rounded font-semibold text-sm transition"
          style="background:#e7e5e4; color:#78716c;">
          Logout
        </button>
      </div>

      <!-- Register -->
      <div>
        <p class="text-lg font-semibold cursor-pointer" style="color:#b45309;" @click="toggleRegisterDialog">
          New here? Create an account →
        </p>
        <dialog ref="registerDialog" class="rounded-xl shadow-xl p-8 w-full max-w-sm"
          style="background:#fff8f0; border:1px solid #e7e5e4;">
          <h3 class="text-2xl font-bold mb-6" style="color:#1c1917; font-family: Georgia, serif;">Create account</h3>
          <form class="flex flex-col gap-3">
            <input type="text" placeholder="Full name"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#e7e5e4; background:#faf7f2; color:#1c1917;"
              v-model="name" />
            <input type="text" placeholder="Email"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#e7e5e4; background:#faf7f2; color:#1c1917;"
              v-model="email" />
            <input type="password" placeholder="Password"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#e7e5e4; background:#faf7f2; color:#1c1917;"
              v-model="password" />
            <button @click.prevent="registerUser(name, email, password)"
              class="w-full py-2.5 rounded font-semibold text-sm mt-2"
              style="background:#b45309; color:#fff;">
              Register
            </button>
          </form>
          <button @click="toggleRegisterDialog"
            class="w-full py-2 rounded text-sm mt-3"
            style="background:#e7e5e4; color:#78716c;">
            Close
          </button>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsers } from '../../modules/auth/useUsers'
const { fetchToken, registerUser, logout, name, email, password } = useUsers()

const registerDialog = ref<HTMLDialogElement | null>(null)
const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    registerDialog.value.open ? registerDialog.value.close() : registerDialog.value.showModal()
  }
}
</script>

<style scoped>
dialog::backdrop { background-color: rgba(0,0,0,0.3); }
dialog { opacity:0; pointer-events:none; transition: opacity 0.3s; }
dialog[open] { opacity:1; pointer-events:inherit; }
</style>
