<template>
  <div class="bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-16 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Property type -->
        <select v-model="filters.property_type" @change="emit('filter')" class="filter-chip">
          <option value="">All types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>

        <!-- Price range -->
        <div class="flex items-center gap-1.5">
          <input v-model.number="filters.min_price" @change="emit('filter')" type="number" placeholder="Min price" class="filter-chip w-28 tabular-nums" />
          <span class="text-gray-300 text-xs">–</span>
          <input v-model.number="filters.max_price" @change="emit('filter')" type="number" placeholder="Max price" class="filter-chip w-28 tabular-nums" />
        </div>

        <!-- Bedrooms -->
        <select v-model="filters.bedrooms" @change="emit('filter')" class="filter-chip">
          <option value="">Bedrooms</option>
          <option :value="1">1 Bed</option>
          <option :value="2">2 Beds</option>
          <option :value="3">3 Beds</option>
          <option :value="4">4+ Beds</option>
        </select>

        <!-- Furnished -->
        <select v-model="filters.furnished" @change="emit('filter')" class="filter-chip">
          <option :value="null">Furnished?</option>
          <option :value="true">Furnished</option>
          <option :value="false">Unfurnished</option>
        </select>

        <!-- City -->
        <div class="relative">
          <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <input v-model="filters.city" @change="emit('filter')" type="text" placeholder="City..." class="filter-chip pl-8 w-36" />
        </div>

        <div class="flex-1" />

        <!-- Sort -->
        <select v-model="filters.sort" @change="emit('filter')" class="filter-chip">
          <option value="">Newest first</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>

        <!-- Reset -->
        <button
          @click="reset"
          class="text-xs text-gray-400 hover:text-[#0a0a0a] px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ListingFilters } from '~/composables/useListings'

const filters = defineModel<ListingFilters>('filters', { required: true })
const emit = defineEmits<{ filter: [] }>()

function reset() {
  filters.value = {
    property_type: '',
    min_price: undefined,
    max_price: undefined,
    bedrooms: undefined,
    furnished: null,
    city: '',
    sort: '',
    page: 1,
  }
  emit('filter')
}
</script>

<style scoped>
@reference "tailwindcss";
.filter-chip {
  @apply text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700
    focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400
    hover:border-gray-300 transition-all duration-150 cursor-pointer;
}
</style>