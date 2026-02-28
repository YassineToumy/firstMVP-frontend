<template>
  <div>
    <!-- Hero -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold text-[#111111] tracking-tight">
          Find your next rental home
        </h1>
        <p class="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Browse rental listings across France, Tunisia, Egypt, and Canada
        </p>

        <!-- Search bar -->
        <div class="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            v-model="searchCity"
            type="text"
            placeholder="Search by city..."
            class="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            @keyup.enter="goSearch"
          />
          <select v-model="searchType" class="px-4 py-3 text-sm border border-gray-200 rounded-lg bg-white">
            <option value="">All types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
          <button
            @click="goSearch"
            class="px-6 py-3 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#333333] transition"
          >
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- Featured listings -->
    <section class="bg-[#F5F5F5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold text-[#111111]">Recent listings</h2>
        <p class="text-sm text-gray-500 mt-1">
          Showing results for {{ region.current.name }}
        </p>

        <div v-if="loadingListings" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          <div v-for="n in 8" :key="n" class="bg-white rounded-lg h-72 animate-pulse" />
        </div>

        <div v-else-if="listings.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          <ListingsListingCard v-for="l in listings" :key="l.source_id" :listing="l" />
        </div>

        <p v-else class="mt-6 text-gray-500 text-sm">No listings found for this region.</p>

        <div class="mt-8 text-center">
          <NuxtLink
            to="/listings"
            class="inline-block px-6 py-2.5 border border-[#111111] text-[#111111] text-sm font-medium rounded-lg hover:bg-[#111111] hover:text-white transition"
          >
            View all listings
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div v-if="regionStats.length" class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div v-for="r in regionStats" :key="r.code">
            <p class="text-3xl font-bold text-[#111111]">{{ r.count?.toLocaleString() || '—' }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ r.name }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/composables/useListings'

const region = useRegionStore()
const { fetchListings, fetchRegions } = useListings()
const router = useRouter()

const searchCity = ref('')
const searchType = ref('')
const listings = ref<Listing[]>([])
const regionStats = ref<{ code: string; name: string; currency: string; count: number }[]>([])
const loadingListings = ref(true)

async function loadFeatured() {
  loadingListings.value = true
  try {
    const res = await fetchListings({ per_page: 8 })
    listings.value = res.data
  } catch (e) {
    console.error('Failed to load featured listings:', e)
  } finally {
    loadingListings.value = false
  }
}

async function loadRegions() {
  try {
    const res = await fetchRegions()
    regionStats.value = res.data
  } catch (e) {
    console.error('Failed to load regions:', e)
  }
}

function goSearch() {
  const q: Record<string, string> = {}
  if (searchCity.value) q.city = searchCity.value
  if (searchType.value) q.property_type = searchType.value
  router.push({ path: '/listings', query: q })
}

// Reload when region changes
watch(() => region.currentCode, () => loadFeatured())

onMounted(() => {
  loadFeatured()
  loadRegions()
})

useHead({ title: 'RentGlobe — Find your next rental home' })
</script>