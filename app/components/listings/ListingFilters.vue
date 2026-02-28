<template>
  <div class="bg-white border-b border-gray-200 sticky top-16 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex flex-wrap items-center gap-3">
        <!-- Property type -->
        <select v-model="filters.property_type" @change="emit('filter')" class="input-filter">
          <option value="">All types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>

        <!-- Price range -->
        <input v-model.number="filters.min_price" @change="emit('filter')" type="number" placeholder="Min price" class="input-filter w-28" />
        <input v-model.number="filters.max_price" @change="emit('filter')" type="number" placeholder="Max price" class="input-filter w-28" />

        <!-- Bedrooms -->
        <select v-model="filters.bedrooms" @change="emit('filter')" class="input-filter">
          <option value="">Bedrooms</option>
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4+</option>
        </select>

        <!-- Furnished -->
        <select v-model="filters.furnished" @change="emit('filter')" class="input-filter">
          <option :value="null">Furnished?</option>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>

        <!-- City -->
        <input v-model="filters.city" @change="emit('filter')" type="text" placeholder="City..." class="input-filter w-36" />

        <!-- Sort -->
        <select v-model="filters.sort" @change="emit('filter')" class="input-filter ml-auto">
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <!-- Reset -->
        <button @click="reset" class="text-xs text-gray-500 hover:text-gray-800 underline">Reset</button>
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
.input-filter {
  @apply text-sm border border-gray-200 rounded px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400;
}
</style>