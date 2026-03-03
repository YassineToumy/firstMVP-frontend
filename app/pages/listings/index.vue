<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Filters -->
    <ListingsListingFilters v-model:filters="filters" @filter="loadListings(1)" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Results header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold text-gray-900">
            Rentals in {{ region.current.name }}
          </h1>
          <p v-if="meta" class="text-sm text-gray-500 mt-0.5">
            {{ meta.total.toLocaleString() }} properties found
          </p>
        </div>
        <!-- View toggle -->
        <div class="hidden sm:flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
          <button class="p-1.5 rounded bg-orange-500 text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button class="p-1.5 rounded text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="n in 12" :key="n" class="bg-white rounded-2xl overflow-hidden">
          <div class="aspect-[4/3] bg-gray-100 animate-pulse" />
          <div class="p-4 space-y-3">
            <div class="h-5 bg-gray-100 rounded animate-pulse w-2/3" />
            <div class="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
            <div class="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
          </div>
        </div>
      </div>

      <!-- Results grid -->
      <div v-else-if="listings.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ListingsListingCard
          v-for="(l, i) in listings"
          :key="l.source_id"
          :listing="l"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${i * 30}ms` }"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-24">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p class="text-gray-600 font-medium">No listings match your filters</p>
        <p class="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
        <button @click="resetAndLoad" class="mt-4 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
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

watch(() => region.currentCode, () => loadListings(1))
onMounted(() => loadListings())

useHead({ title: computed(() => `Listings — ${region.current.name} | RentGlobe`) })
</script>