<template>
  <div class="min-h-screen bg-[#F5F5F5]">
    <!-- Filters -->
    <ListingsListingFilters v-model:filters="filters" @filter="loadListings(1)" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Results count -->
      <p class="text-sm text-gray-500 mb-4">
        <template v-if="meta">
          Showing {{ meta.total.toLocaleString() }} rentals in {{ region.current.name }}
        </template>
      </p>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="n in 12" :key="n" class="bg-white rounded-lg h-80 animate-pulse" />
      </div>

      <!-- Results grid -->
      <div v-else-if="listings.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ListingsListingCard v-for="l in listings" :key="l.source_id" :listing="l" />
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-20">
        <p class="text-gray-500">No listings match your filters.</p>
        <button @click="resetAndLoad" class="mt-3 text-sm underline text-gray-600 hover:text-gray-800">
          Clear all filters
        </button>
      </div>

      <!-- Pagination -->
      <UiPagination
        v-if="meta && meta.last_page > 1"
        :current-page="meta.current_page"
        :last-page="meta.last_page"
        @update:page="loadListings"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/composables/useListings'

const region = useRegionStore()
const { fetchListings } = useListings()
const route = useRoute()

const listings = ref<Listing[]>([])
const meta = ref<{ current_page: number; last_page: number; per_page: number; total: number } | null>(null)
const loading = ref(true)

const filters = ref({
  property_type: (route.query.property_type as string) || '',
  min_price: route.query.min_price ? Number(route.query.min_price) : undefined,
  max_price: route.query.max_price ? Number(route.query.max_price) : undefined,
  bedrooms: route.query.bedrooms ? Number(route.query.bedrooms) : undefined,
  furnished: null as boolean | null,
  city: (route.query.city as string) || '',
  sort: '',
  page: 1,
})

async function loadListings(page = 1) {
  loading.value = true
  filters.value.page = page
  try {
    const res = await fetchListings(filters.value)
    listings.value = res.data
    meta.value = res.meta
  } catch (e) {
    console.error('Failed to load listings:', e)
    listings.value = []
  } finally {
    loading.value = false
  }
}

function resetAndLoad() {
  filters.value = { property_type: '', min_price: undefined, max_price: undefined, bedrooms: undefined, furnished: null, city: '', sort: '', page: 1 }
  loadListings(1)
}

// Reload when region changes
watch(() => region.currentCode, () => loadListings(1))

// Initial load on mount
onMounted(() => loadListings())

useHead({ title: `Listings — ${region.current.name} | RentGlobe` })
</script>