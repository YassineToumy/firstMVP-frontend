<template>
  <header class="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/5 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
          <span class="text-white text-sm font-bold">R</span>
        </div>
        <span class="text-lg font-bold tracking-tight group-hover:text-gray-300 transition-colors">RentGlobe</span>
      </NuxtLink>

      <!-- Center nav -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/listings" class="nav-link">Listings</NuxtLink>
        <div class="mx-2 w-px h-5 bg-white/10" />
        <LayoutRegionSelector />
      </nav>

      <!-- Right: Auth -->
      <div class="flex items-center gap-2.5">
        <template v-if="isLoggedIn">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
            <div class="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
              <span class="text-[10px] font-bold text-white">{{ user?.name?.[0]?.toUpperCase() }}</span>
            </div>
            <span class="text-sm text-gray-300">{{ user?.name }}</span>
          </div>
          <button @click="logout" class="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
            Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
            Sign In
          </NuxtLink>
          <NuxtLink to="/register" class="hidden sm:inline-flex text-sm px-5 py-2 bg-white text-[#0a0a0a] rounded-lg font-medium hover:bg-gray-100 active:scale-[0.98] transition-all">
            Get Started
          </NuxtLink>
        </template>

        <!-- Mobile menu button -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden ml-1 p-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors">
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
      <div v-if="mobileOpen" class="md:hidden bg-[#111] border-t border-white/5 px-4 py-4 space-y-1">
        <LayoutRegionSelector />
        <NuxtLink to="/" class="block px-3 py-2.5 text-sm text-gray-300 rounded-lg hover:bg-white/5" @click="mobileOpen = false">Home</NuxtLink>
        <NuxtLink to="/listings" class="block px-3 py-2.5 text-sm text-gray-300 rounded-lg hover:bg-white/5" @click="mobileOpen = false">Listings</NuxtLink>
        <template v-if="!isLoggedIn">
          <div class="pt-2 border-t border-white/5">
            <NuxtLink to="/register" class="block w-full text-center px-3 py-2.5 bg-white text-[#0a0a0a] text-sm font-medium rounded-lg" @click="mobileOpen = false">
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
  @apply text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200;
}
.router-link-active.nav-link {
  @apply text-white bg-white/5;
}
</style>