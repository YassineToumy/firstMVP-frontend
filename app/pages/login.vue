<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-[#FAFAFA]">
    <div class="w-full max-w-sm animate-fade-in-up">
      <!-- Icon -->
      <div class="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center mb-6">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-[#0a0a0a] text-center">Welcome back</h1>
      <p class="text-sm text-gray-500 text-center mt-1">Sign in to your RentGlobe account</p>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
          <input v-model="email" type="email" required autocomplete="email"
            class="auth-input" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
          <input v-model="password" type="password" required autocomplete="current-password"
            class="auth-input" placeholder="••••••••" />
        </div>

        <!-- Error -->
        <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
          <p v-if="error" class="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{{ error }}</p>
        </Transition>

        <button type="submit" :disabled="loading"
          class="w-full py-3 bg-[#0a0a0a] text-white text-sm font-semibold rounded-xl hover:bg-[#222] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-sm text-gray-500 text-center mt-8">
        Don't have an account?
        <NuxtLink to="/register" class="text-[#0a0a0a] font-semibold hover:text-violet-600 transition-colors">Create one</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e?.data?.message || 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}

useHead({ title: 'Sign In | RentGlobe' })
</script>

<style scoped>
@reference "tailwindcss";
.auth-input {
  @apply w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm
    focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400
    placeholder-gray-400 transition-all duration-150;
}
</style>