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

onMounted(() => {
  darkMode.init()
  favorites.init()
  region.init()
  fetchUser()
})
</script>
