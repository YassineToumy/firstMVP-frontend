<template>
  <footer class="bg-[#111111] text-gray-400 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-sm font-medium text-white">RentGlobe</span>
        <div class="flex gap-6 text-sm">
          <NuxtLink to="/" class="hover:text-white transition">Home</NuxtLink>
          <NuxtLink to="/listings" class="hover:text-white transition">Listings</NuxtLink>
        </div>
        <span class="text-xs text-gray-500">&copy; {{ new Date().getFullYear() }} RentGlobe. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>