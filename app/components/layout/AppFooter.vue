<template>
  <footer class="bg-[#0a0a0a] text-gray-400 mt-auto border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="sm:col-span-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
              <span class="text-white text-xs font-bold">R</span>
            </div>
            <span class="text-base font-bold text-white">RentGlobe</span>
          </div>
          <p class="mt-3 text-sm text-gray-500 max-w-sm leading-relaxed">
            Aggregating rental listings from France, Tunisia, Egypt &amp; Canada.
            Find your next home, all in one place.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Platform</h4>
          <div class="space-y-2">
            <NuxtLink to="/" class="block text-sm hover:text-white transition-colors">Home</NuxtLink>
            <NuxtLink to="/listings" class="block text-sm hover:text-white transition-colors">Listings</NuxtLink>
            <NuxtLink to="/register" class="block text-sm hover:text-white transition-colors">Register</NuxtLink>
          </div>
        </div>

        <!-- Regions -->
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Regions</h4>
          <div class="space-y-2 text-sm">
            <span class="block">🇫🇷 France</span>
            <span class="block">🇹🇳 Tunisia</span>
            <span class="block">🇪🇬 Egypt</span>
            <span class="block">🇨🇦 Canada</span>
          </div>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span class="text-xs text-gray-600">&copy; {{ new Date().getFullYear() }} RentGlobe. All rights reserved.</span>
        <div class="flex items-center gap-4 text-xs text-gray-600">
          <a href="#" class="hover:text-gray-400 transition-colors">Privacy</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Terms</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>