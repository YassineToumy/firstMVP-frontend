<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useDarkMode } from '~/composables/useDarkMode'
import { useFavoritesStore } from '~/stores/favorites'

const darkMode = useDarkMode()
const favorites = useFavoritesStore()
const region = useRegionStore()
const { fetchUser } = useAuth()
const { locale } = useI18n()

// Apply RTL direction when Arabic is selected
watch(locale, (newLocale) => {
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = newLocale
}, { immediate: true })

onMounted(() => {
  darkMode.init()
  favorites.init()
  region.init()
  fetchUser()
})
</script>
