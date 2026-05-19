<template>
  <div class="flex min-h-[80vh]">
    <!-- Left: image -->
    <div class="hidden md:block w-1/2 bg-cover bg-center rounded-xl overflow-hidden"
      style="background-image: url('https://picsum.photos/800/1200');"></div>

    <!-- Right: forms -->
    <div class="w-full md:w-1/2 flex flex-col justify-center px-12 py-10">
      <!-- Login -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold mb-1" style="color:#134e4a; font-family: 'Playfair Display', serif;">Sign in</h2>
        <p class="text-sm mb-6" style="color:#64748b;">Welcome back to BookStore</p>

        <div v-if="error" class="mb-4 px-4 py-2.5 rounded text-sm" style="background:#fee2e2; color:#b91c1c;">
          {{ error }}
        </div>

        <input type="text" placeholder="Email"
          class="block w-full mb-3 px-4 py-2.5 rounded border text-sm focus:outline-none"
          style="border-color:#d1faf5; background:#ffffff; color:#134e4a;"
          v-model="email" />
        <input type="password" placeholder="Password"
          class="block w-full mb-4 px-4 py-2.5 rounded border text-sm focus:outline-none"
          style="border-color:#d1faf5; background:#ffffff; color:#134e4a;"
          v-model="password" />
        <button @click="fetchToken(email, password)"
          :disabled="loading"
          class="w-full py-2.5 rounded font-semibold text-sm transition mb-2"
          :style="loading ? 'background:#d97706; color:#fff; cursor:not-allowed;' : 'background:#0d9488; color:#fff;'">
          {{ loading ? 'Signing in...' : 'Login' }}
        </button>
        <button @click="logout()"
          class="w-full py-2.5 rounded font-semibold text-sm transition"
          style="background:#d1faf5; color:#64748b;">
          Logout
        </button>
      </div>

      <!-- Register -->
      <div>
        <p class="text-lg font-semibold cursor-pointer" style="color:#0d9488;" @click="toggleRegisterDialog">
          New here? Create an account →
        </p>
        <dialog ref="registerDialog" class="rounded-xl shadow-xl p-8 w-full max-w-sm"
          style="background:#ffffff; border:1px solid #d1faf5;">
          <h3 class="text-2xl font-bold mb-6" style="color:#134e4a; font-family: 'Playfair Display', serif;">Create account</h3>

          <div v-if="registerError" class="mb-4 px-4 py-2.5 rounded text-sm" style="background:#fee2e2; color:#b91c1c;">
            {{ registerError }}
          </div>
          <div v-if="registerSuccess" class="mb-4 px-4 py-2.5 rounded text-sm" style="background:#dcfce7; color:#15803d;">
            Account created! You can now log in.
          </div>

          <form class="flex flex-col gap-3">
            <input type="text" placeholder="Full name"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;"
              v-model="regName" />
            <input type="text" placeholder="Email"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;"
              v-model="regEmail" />
            <input type="password" placeholder="Password"
              class="px-4 py-2.5 rounded border text-sm focus:outline-none"
              style="border-color:#d1faf5; background:#f0fafb; color:#134e4a;"
              v-model="regPassword" />
            <button @click.prevent="handleRegister"
              class="w-full py-2.5 rounded font-semibold text-sm mt-2"
              style="background:#0d9488; color:#fff;">
              Register
            </button>
          </form>
          <button @click="toggleRegisterDialog"
            class="w-full py-2 rounded text-sm mt-3"
            style="background:#d1faf5; color:#64748b;">
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

const { fetchToken, registerUser, logout, email, password, error, loading } = useUsers()

const registerDialog = ref<HTMLDialogElement | null>(null)
const regName = ref('')
const regEmail = ref('')
const regPassword = ref('')
const registerError = ref<string | null>(null)
const registerSuccess = ref(false)

const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    registerDialog.value.open ? registerDialog.value.close() : registerDialog.value.showModal()
  }
  registerError.value = null
  registerSuccess.value = false
}

const handleRegister = async () => {
  registerError.value = null
  registerSuccess.value = false
  await registerUser(regName.value, regEmail.value, regPassword.value)
  if (error.value) {
    registerError.value = error.value
  } else {
    registerSuccess.value = true
    regName.value = ''
    regEmail.value = ''
    regPassword.value = ''
  }
}
</script>

<style scoped>
dialog::backdrop { background-color: rgba(0,0,0,0.3); }
dialog { opacity:0; pointer-events:none; transition: opacity 0.3s; }
dialog[open] { opacity:1; pointer-events:inherit; }
</style>
