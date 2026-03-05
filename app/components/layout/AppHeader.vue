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
        <NuxtLink to="/conseils" class="nav-link">{{ $t('nav.tips') }}</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">{{ $t('nav.contact') }}</NuxtLink>
        <NuxtLink to="/about" class="nav-link">{{ $t('nav.about') }}</NuxtLink>
        <div class="mx-2 w-px h-5 bg-gray-200" />
        <LayoutLanguageSelector />
      </nav>

      <!-- Right: Auth -->
      <div class="flex items-center gap-2.5">
        <template v-if="isLoggedIn">
          <!-- Account dropdown -->
          <div class="relative hidden sm:block" ref="accountRef">
            <button
              @click="accountOpen = !accountOpen"
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all"
            >
              <div class="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <span class="text-[10px] font-bold text-white">{{ user?.name?.[0]?.toUpperCase() }}</span>
              </div>
              <span class="text-sm text-gray-700">{{ user?.name }}</span>
              <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 text-gray-400 transition-transform" :class="{ 'rotate-180': accountOpen }" />
            </button>

            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div v-if="accountOpen" class="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
                </div>
                <div class="p-1">
                  <NuxtLink
                    v-for="item in accountMenu"
                    :key="item.to"
                    :to="item.to"
                    @click="accountOpen = false"
                    class="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all"
                  >
                    <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
                    {{ item.label }}
                    <span v-if="item.badge" class="ml-auto text-xs font-semibold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
                      {{ item.badge }}
                    </span>
                  </NuxtLink>
                </div>
                <div class="border-t border-gray-100 p-1">
                  <button
                    @click="doLogout"
                    class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <Icon name="lucide:log-out" class="w-4 h-4" />
                    {{ $t('nav.signOut') }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
            {{ $t('nav.signIn') }}
          </NuxtLink>
          <NuxtLink to="/register" class="hidden sm:inline-flex text-sm px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 active:scale-[0.98] transition-all">
            {{ $t('nav.getStarted') }}
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
        <LayoutLanguageSelector />
        <NuxtLink to="/conseils" class="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50" @click="mobileOpen = false">{{ $t('nav.tips') }}</NuxtLink>
        <NuxtLink to="/contact" class="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50" @click="mobileOpen = false">{{ $t('nav.contact') }}</NuxtLink>
        <NuxtLink to="/about" class="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50" @click="mobileOpen = false">{{ $t('nav.about') }}</NuxtLink>
        <template v-if="isLoggedIn">
          <div class="pt-2 border-t border-gray-100 space-y-1">
            <NuxtLink v-for="item in accountMenu" :key="item.to" :to="item.to" @click="mobileOpen = false"
              class="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
              <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
              {{ item.label }}
            </NuxtLink>
            <button @click="doLogout" class="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-500 rounded-lg hover:bg-red-50">
              <Icon name="lucide:log-out" class="w-4 h-4" />
              {{ $t('nav.signOut') }}
            </button>
          </div>
        </template>
        <template v-else>
          <div class="pt-2 border-t border-gray-100">
            <NuxtLink to="/register" class="block w-full text-center px-3 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600" @click="mobileOpen = false">
              {{ $t('nav.getStarted') }}
            </NuxtLink>
          </div>
        </template>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'

const { t } = useI18n()
const { user, isLoggedIn, logout } = useAuth()
const favorites = useFavoritesStore()
const router = useRouter()
const mobileOpen = ref(false)
const accountOpen = ref(false)
const accountRef = ref<HTMLElement>()

const accountMenu = computed(() => [
  {
    to: '/account/favorites',
    icon: 'lucide:heart',
    label: t('nav.favorites'),
    badge: favorites.count > 0 ? favorites.count : undefined,
  },
  { to: '/account/password', icon: 'lucide:lock', label: t('nav.password') },
  { to: '/account/social', icon: 'lucide:share-2', label: t('nav.social') },
  { to: '/account/settings', icon: 'lucide:settings', label: t('nav.settings') },
])

async function doLogout() {
  accountOpen.value = false
  mobileOpen.value = false
  await logout()
  router.push('/')
}

onMounted(() => {
  document.addEventListener('click', (e: MouseEvent) => {
    if (accountRef.value && !accountRef.value.contains(e.target as Node)) {
      accountOpen.value = false
    }
  })
})
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
