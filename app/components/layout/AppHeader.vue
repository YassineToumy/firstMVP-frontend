<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
          <span class="text-white text-sm font-bold">R</span>
        </div>
        <span class="text-lg font-bold tracking-tight text-gray-900 group-hover:text-orange-500 transition-colors">RentGlobe</span>
      </NuxtLink>

      <!-- Center nav -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink to="/conseils" class="nav-link">Conseils</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About us</NuxtLink>
        <div class="mx-2 w-px h-5 bg-gray-200" />
        <LayoutRegionSelector />
      </nav>

      <!-- Right: Auth -->
      <div class="flex items-center gap-2.5">
        <template v-if="isLoggedIn">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50">
            <div class="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
              <span class="text-[10px] font-bold text-white">{{ user?.name?.[0]?.toUpperCase() }}</span>
            </div>
            <span class="text-sm text-gray-700">{{ user?.name }}</span>
          </div>
          <button @click="logout" class="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
            Sign In
          </NuxtLink>
          <NuxtLink to="/register" class="hidden sm:inline-flex text-sm px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 active:scale-[0.98] transition-all">
            Get Started
          </NuxtLink>
        </template>

        <!-- Mobile menu button -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden ml-1 p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
        <LayoutRegionSelector />
        <NuxtLink to="/conseils" class="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50" @click="mobileOpen = false">Conseils</NuxtLink>
        <NuxtLink to="/contact" class="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50" @click="mobileOpen = false">Contact</NuxtLink>
        <NuxtLink to="/about" class="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50" @click="mobileOpen = false">About us</NuxtLink>
        <template v-if="!isLoggedIn">
          <div class="pt-2 border-t border-gray-100">
            <NuxtLink to="/register" class="block w-full text-center px-3 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600" @click="mobileOpen = false">
              Get Started
            </NuxtLink>
          </div>
        </template>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth()
const mobileOpen = ref(false)
</script>

<style scoped>
@reference "tailwindcss";
.nav-link {
  @apply text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200;
}
.router-link-active.nav-link {
  @apply text-orange-500 bg-orange-50;
}
</style>
