<template>
  <div class="min-h-screen bg-[#F5F5F5]">
    <!-- Loading -->
    <div v-if="pending" class="max-w-7xl mx-auto px-4 py-12">
      <div class="bg-white rounded-lg h-96 animate-pulse" />
    </div>

    <!-- Content -->
    <div v-else-if="listing" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <!-- Image gallery -->
      <div class="bg-white rounded-lg overflow-hidden shadow-sm">
        <div class="relative aspect-[16/9] sm:aspect-[21/9] bg-gray-100 overflow-hidden">
          <img
            v-if="mainImage"
            :src="mainImage"
            :alt="listing.title || listing.city"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
            <span class="text-sm">No image available</span>
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="images.length > 1" class="flex gap-1 p-2 overflow-x-auto">
          <button
            v-for="(img, i) in images.slice(0, 10)"
            :key="i"
            @click="currentImage = Number(i)"
            class="flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition"
            :class="currentImage === Number(i) ? 'border-[#111111]' : 'border-transparent opacity-70 hover:opacity-100'"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Two column layout -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left column -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Title & price -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h1 class="text-2xl font-bold text-[#111111]">
              {{ listing.title || `${listing.property_type} in ${listing.city}` }}
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              {{ listing.city }}<span v-if="listing.district">, {{ listing.district }}</span>
              <span v-if="listing.postal_code"> — {{ listing.postal_code }}</span>
            </p>

            <p class="text-3xl font-bold text-[#111111] mt-4">
              {{ formatPrice(listing.price, listing.currency) }}
              <span class="text-base font-normal text-gray-500">/month</span>
            </p>

            <!-- Key stats -->
            <div class="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
              <span v-if="listing.bedrooms">{{ listing.bedrooms }} bedrooms</span>
              <span v-if="listing.bathrooms">{{ listing.bathrooms }} bathrooms</span>
              <span v-if="listing.surface_m2">{{ listing.surface_m2 }} m²</span>
              <span v-if="listing.floor">Floor {{ listing.floor }}</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-if="listing.property_type" class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">{{ listing.property_type }}</span>
              <span v-if="listing.is_furnished !== undefined" class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">{{ listing.is_furnished ? 'Furnished' : 'Unfurnished' }}</span>
              <span v-if="listing.energy_classification" class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">Energy: {{ listing.energy_classification }}</span>
            </div>
          </div>

          <!-- Description -->
          <div v-if="listing.description" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Description</h2>
            <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ listing.description }}</p>
          </div>

          <!-- Features -->
          <div v-if="featuresList.length" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Features</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="f in featuresList" :key="f" class="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">{{ f }}</span>
            </div>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-6">

          <!-- Agent card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Contact</h3>
            <p v-if="listing.agent_or_agency || listing.agency_name || listing.seller_name" class="text-sm text-gray-700">
              {{ listing.agent_or_agency || listing.agency_name || listing.seller_name }}
            </p>
            <p v-else class="text-sm text-gray-400">No contact info</p>
            <button class="mt-4 w-full py-2.5 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#333333] transition">
              Contact
            </button>
          </div>

          <!-- Property details -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Property details</h3>
            <dl class="space-y-2 text-sm">
              <div v-for="(val, key) in detailFields" :key="key" class="flex justify-between">
                <dt class="text-gray-500">{{ key }}</dt>
                <dd class="text-gray-800 font-medium">{{ val }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="max-w-7xl mx-auto px-4 py-20 text-center">
      <p class="text-gray-500">Listing not found.</p>
      <NuxtLink to="/listings" class="mt-3 inline-block text-sm underline text-gray-600">Back to listings</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchListing } = useListings()

const source = route.params.source as string
const id = route.params.id as string
const currentImage = ref<number>(0)

const { data: res, pending } = await useAsyncData(`listing-${source}-${id}`, () => fetchListing(source, id))
const listing = computed(() => res.value?.data || null)

/**
 * Parse images/photos — handles PostgreSQL TEXT[] returned as string "{url1,url2}"
 */
function parseArrayField(val: any): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val.filter(Boolean)
  if (typeof val === 'string') {
    // PostgreSQL array format: {url1,url2,url3}
    if (val.startsWith('{') && val.endsWith('}')) {
      return val.slice(1, -1).split(',').map(s => s.replace(/^"|"$/g, '')).filter(Boolean)
    }
    // Single URL
    if (val.startsWith('http')) return [val]
  }
  return []
}

const images = computed(() => {
  if (!listing.value) return []
  const fromImages = parseArrayField(listing.value.images)
  const fromPhotos = parseArrayField(listing.value.photos)
  const result = fromImages.length ? fromImages : fromPhotos
  if (!result.length && listing.value.thumbnail) {
    return [listing.value.thumbnail]
  }
  return result
})

const mainImage = computed(() => images.value?.[currentImage.value] || null)

/**
 * Parse features/amenities — same PostgreSQL array issue
 */
const featuresList = computed(() => {
  if (!listing.value) return []
  return [
    ...parseArrayField(listing.value.features),
    ...parseArrayField(listing.value.amenities),
  ]
})

const detailFields = computed(() => {
  if (!listing.value) return {}
  const l = listing.value
  const fields: Record<string, any> = {}
  if (l.rooms) fields['Rooms'] = l.rooms
  if (l.bedrooms) fields['Bedrooms'] = l.bedrooms
  if (l.bathrooms) fields['Bathrooms'] = l.bathrooms
  if (l.surface_m2) fields['Surface'] = `${l.surface_m2} m²`
  if (l.floor) fields['Floor'] = l.floor
  if (l.heating) fields['Heating'] = l.heating
  if (l.is_furnished !== undefined && l.is_furnished !== null) fields['Furnished'] = l.is_furnished ? 'Yes' : 'No'
  if (l.energy_class) fields['Energy'] = l.energy_class
  if (l.parking_spots) fields['Parking'] = l.parking_spots
  if (l.charges) fields['Charges'] = `${l.charges} ${l.currency || ''}`
  return fields
})

function formatPrice(price: number, currency: string): string {
  if (!price) return 'Price on request'
  const locales: Record<string, string> = { EUR: 'fr-FR', TND: 'fr-TN', EGP: 'en-EG', CAD: 'en-CA' }
  try {
    return new Intl.NumberFormat(locales[currency] || 'en-US', {
      style: 'currency', currency, maximumFractionDigits: 0,
    }).format(price)
  } catch {
    return `${price.toLocaleString()} ${currency}`
  }
}

useHead({ title: listing.value ? `${listing.value.title || listing.value.city} | RentGlobe` : 'Listing | RentGlobe' })
</script>