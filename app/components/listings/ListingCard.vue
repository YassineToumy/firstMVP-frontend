<template>
  <NuxtLink
    :to="`/listings/${listing.source}/${listing.source_id}`"
    class="block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden">
      <img
        v-if="listing.thumbnail"
        :src="listing.thumbnail"
        :alt="listing.city"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>

      <!-- Property type badge -->
      <span class="absolute top-2 left-2 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
        {{ listing.property_type }}
      </span>

      <!-- Photos count -->
      <span v-if="listing.photos_count" class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        {{ listing.photos_count }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Price -->
      <p class="text-lg font-bold text-[#111111]">
        {{ formatPrice(listing.price, listing.currency) }}
        <span class="text-sm font-normal text-gray-500">/month</span>
      </p>

      <!-- Location -->
      <p class="text-sm text-gray-600 mt-1 truncate">
        {{ listing.city }}<span v-if="listing.district">, {{ listing.district }}</span>
      </p>

      <!-- Stats row -->
      <div class="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <span v-if="listing.bedrooms" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
          {{ listing.bedrooms }} bd
        </span>
        <span v-if="listing.bathrooms" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          {{ listing.bathrooms }} ba
        </span>
        <span v-if="listing.surface_m2" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          {{ listing.surface_m2 }} m²
        </span>
      </div>

      <!-- Agency -->
      <p v-if="listing.agent_or_agency" class="text-xs text-gray-400 mt-3 truncate">
        {{ listing.agent_or_agency }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Listing } from '~/composables/useListings'

defineProps<{ listing: Listing }>()

function formatPrice(price: number, currency: string): string {
  const locales: Record<string, string> = { EUR: 'fr-FR', TND: 'fr-TN', EGP: 'en-EG', CAD: 'en-CA' }
  try {
    return new Intl.NumberFormat(locales[currency] || 'en-US', {
      style: 'currency', currency, maximumFractionDigits: 0,
    }).format(price)
  } catch {
    return `${price.toLocaleString()} ${currency}`
  }
}
</script>