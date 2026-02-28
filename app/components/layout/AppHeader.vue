<template>
  <header class="sticky top-0 z-50 bg-[#111111] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-xl font-bold tracking-tight">RentGlobe</NuxtLink>

      <!-- Center nav -->
      <nav class="hidden md:flex items-center gap-6">
        <LayoutRegionSelector />
        <NuxtLink to="/" class="text-sm text-gray-300 hover:text-white transition">Home</NuxtLink>
        <NuxtLink to="/listings" class="text-sm text-gray-300 hover:text-white transition">Listings</NuxtLink>
      </nav>

      <!-- Right: Auth -->
      <div class="flex items-center gap-3">
        <template v-if="isLoggedIn">
          <span class="text-sm text-gray-300">{{ user?.name }}</span>
          <button @click="logout" class="text-sm text-gray-400 hover:text-white transition">Logout</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-sm px-4 py-1.5 border border-gray-500 rounded hover:border-white transition">Sign In</NuxtLink>
          <NuxtLink to="/register" class="hidden sm:inline-block text-sm px-4 py-1.5 bg-white text-[#111111] rounded font-medium hover:bg-gray-200 transition">Register</NuxtLink>
        </template>
      </div>

      <!-- Mobile menu button -->
      <button @click="mobileOpen = !mobileOpen" class="md:hidden ml-3 text-gray-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <div v-if="mobileOpen" class="md:hidden bg-[#1a1a1a] border-t border-gray-800 px-4 py-4 space-y-3">
      <LayoutRegionSelector />
      <NuxtLink to="/" class="block text-sm text-gray-300" @click="mobileOpen = false">Home</NuxtLink>
      <NuxtLink to="/listings" class="block text-sm text-gray-300" @click="mobileOpen = false">Listings</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth()
const mobileOpen = ref(false)
</script>