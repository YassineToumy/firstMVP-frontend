<template>
  <div class="min-h-screen bg-[#F5F5F5]">
    <!-- Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-12">
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
            :alt="displayTitle"
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
            @click="currentImage = i"
            class="flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition"
            :class="currentImage === i ? 'border-[#111111]' : 'border-transparent opacity-70 hover:opacity-100'"
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
            <h1 class="text-2xl font-bold text-[#111111]">{{ displayTitle }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ displayLocation }}</p>

            <p class="text-3xl font-bold text-[#111111] mt-4">
              {{ formatPrice(displayPrice, displayCurrency) }}
              <span class="text-base font-normal text-gray-500">/month</span>
            </p>

            <!-- Key stats -->
            <div class="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
              <span v-if="normalized.bedrooms">{{ normalized.bedrooms }} bedrooms</span>
              <span v-if="normalized.bathrooms">{{ normalized.bathrooms }} bathrooms</span>
              <span v-if="normalized.surface">{{ normalized.surface }} m²</span>
              <span v-if="normalized.rooms">{{ normalized.rooms }} rooms</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-if="normalized.propertyType" class="tag">{{ normalized.propertyType }}</span>
              <span v-if="normalized.furnished !== null" class="tag">{{ normalized.furnished ? 'Furnished' : 'Unfurnished' }}</span>
              <span v-for="(tag, i) in normalized.extraTags" :key="i" class="tag">{{ tag }}</span>
            </div>
          </div>

          <!-- Description -->
          <div v-if="normalized.description" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Description</h2>
            <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ normalized.description }}</p>
          </div>

          <!-- Features -->
          <div v-if="normalized.features.length" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Features</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="(f, i) in normalized.features" :key="i" class="tag">{{ f }}</span>
            </div>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-6">

          <!-- Agent card -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Contact</h3>
            <p v-if="normalized.agent" class="text-sm text-gray-700">{{ normalized.agent }}</p>
            <p v-else class="text-sm text-gray-400">No contact info</p>
            <button class="mt-4 w-full py-2.5 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#333333] transition">
              Contact
            </button>
          </div>

          <!-- Property details -->
          <div v-if="Object.keys(detailFields).length" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Property details</h3>
            <dl class="space-y-2 text-sm">
              <div v-for="(val, key) in detailFields" :key="key" class="flex justify-between">
                <dt class="text-gray-500">{{ key }}</dt>
                <dd class="text-gray-800 font-medium text-right max-w-[60%]">{{ val }}</dd>
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
const currentImage = ref(0)
const listing = ref<Record<string, any> | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetchListing(source, id)
    listing.value = res.data
  } catch (e) {
    console.error('Failed to load listing:', e)
  } finally {
    loading.value = false
  }
})

// ── Normalize fields across all sources ──
const normalized = computed(() => {
  const l = listing.value
  if (!l) return { bedrooms: null, bathrooms: null, surface: null, rooms: null, propertyType: null, furnished: null, description: null, features: [], agent: null, extraTags: [] }

  return match_source(source, l)
})

function match_source(src: string, l: Record<string, any>) {
  switch (src) {
    case 'bienici':
      return {
        bedrooms: l.bedrooms ?? l.bedrooms_quantity ?? l.bedroomsQuantity,
        bathrooms: l.bathrooms ?? l.bathrooms_quantity ?? l.bathroomsQuantity,
        surface: l.surface_m2 ?? l.surface_area ?? l.surfaceArea,
        rooms: l.rooms ?? l.rooms_quantity ?? l.roomsQuantity,
        propertyType: l.property_type ?? l.propertyType,
        furnished: l.is_furnished ?? l.isFurnished ?? null,
        description: l.description,
        features: [],
        agent: l.agency_name ?? l.agencyName,
        extraTags: [
          l.energy_classification || l.energyClassification ? `Energy: ${l.energy_classification || l.energyClassification}` : null,
          l.heating ? `Heating: ${l.heating}` : null,
          l.floor ? `Floor ${l.floor}` : null,
        ].filter(Boolean),
      }

    case 'mubawab':
      return {
        bedrooms: l.bedrooms,
        bathrooms: l.bathrooms,
        surface: l.area_m2,
        rooms: l.rooms,
        propertyType: l.property_type,
        furnished: null,
        description: l.description,
        features: Array.isArray(l.features) ? l.features : [],
        agent: l.seller_name,
        extraTags: [
          l.property_condition ? `Condition: ${l.property_condition}` : null,
          l.floor_number ? `Floor ${l.floor_number}` : null,
          l.orientation ? `Orientation: ${l.orientation}` : null,
        ].filter(Boolean),
      }

    case 'propertyfinder':
      return {
        bedrooms: l.bedrooms,
        bathrooms: l.bathrooms,
        surface: l.surface_sqm ?? (l.property_size?.sqm),
        rooms: null,
        propertyType: l.property_type,
        furnished: l.is_furnished,
        description: l.description,
        features: Array.isArray(l.amenities) ? l.amenities : [],
        agent: l.agent_name || l.agency_name,
        extraTags: [
          l.available_from ? `Available: ${l.available_from}` : null,
          l.compound ? `Compound: ${l.compound}` : null,
          l.price_period === 'yearly' ? 'Yearly rent' : null,
        ].filter(Boolean),
      }

    case 'mktlist':
      return {
        bedrooms: l.beds,
        bathrooms: l.baths,
        surface: l.surface_m2_approx,
        rooms: l.beds,
        propertyType: l.property_type || l.building_type,
        furnished: null,
        description: l.description,
        features: Array.isArray(l.features) ? l.features : [],
        agent: l.realtor_name || l.brokerage_name,
        extraTags: [
          l.parking_type ? `Parking: ${l.parking_type}` : null,
          l.heating_type ? `Heating: ${l.heating_type}` : null,
          l.basement_type ? `Basement: ${l.basement_type}` : null,
        ].filter(Boolean),
      }

    default:
      return { bedrooms: null, bathrooms: null, surface: null, rooms: null, propertyType: null, furnished: null, description: null, features: [], agent: null, extraTags: [] }
  }
}

// ── Display helpers ──
const displayTitle = computed(() => {
  const l = listing.value
  if (!l) return ''
  return l.title || `${normalized.value.propertyType || 'Property'} in ${l.city || 'Unknown'}`
})

const displayLocation = computed(() => {
  const l = listing.value
  if (!l) return ''
  const parts = [
    l.city,
    l.district || l.district_name || l.location_text || l.community_name,
    l.postal_code || l.postalCode,
  ].filter(Boolean)
  return parts.join(', ')
})

const displayPrice = computed(() => {
  const l = listing.value
  if (!l) return 0
  return l.price ?? l.price_value ?? 0
})

const displayCurrency = computed(() => {
  const l = listing.value
  if (!l) return 'EUR'
  return l.currency || { bienici: 'EUR', mubawab: 'TND', propertyfinder: 'EGP', mktlist: 'CAD' }[source] || 'EUR'
})

// ── Images ──
const images = computed(() => {
  const l = listing.value
  if (!l) return []
  // Different sources store images differently
  if (Array.isArray(l.images)) return l.images
  if (Array.isArray(l.photos)) return l.photos
  if (l.thumbnail) return [l.thumbnail]
  return []
})

const mainImage = computed(() => images.value[currentImage.value] || null)

// ── Detail fields (right sidebar) ──
const detailFields = computed(() => {
  const l = listing.value
  if (!l) return {}
  const f: Record<string, any> = {}

  // Common
  if (normalized.value.rooms) f['Rooms'] = normalized.value.rooms
  if (normalized.value.bedrooms) f['Bedrooms'] = normalized.value.bedrooms
  if (normalized.value.bathrooms) f['Bathrooms'] = normalized.value.bathrooms
  if (normalized.value.surface) f['Surface'] = `${normalized.value.surface} m²`

  // Source-specific extras
  switch (source) {
    case 'bienici':
      if (l.floor) f['Floor'] = l.floor
      if (l.heating) f['Heating'] = l.heating
      if (l.charges) f['Charges'] = `${l.charges} EUR`
      if (l.energy_classification) f['Energy class'] = l.energy_classification
      if (l.ges_classification) f['GES class'] = l.ges_classification
      if (l.has_elevator !== undefined) f['Elevator'] = l.has_elevator ? 'Yes' : 'No'
      if (l.parking_places_quantity) f['Parking'] = l.parking_places_quantity
      if (l.postal_code) f['Postal code'] = l.postal_code
      break

    case 'mubawab':
      if (l.property_condition) f['Condition'] = l.property_condition
      if (l.property_age) f['Age'] = l.property_age
      if (l.floor_number) f['Floor'] = l.floor_number
      if (l.orientation) f['Orientation'] = l.orientation
      if (l.floor_type) f['Floor type'] = l.floor_type
      break

    case 'propertyfinder':
      if (l.compound) f['Compound'] = l.compound
      if (l.district) f['District'] = l.district
      if (l.available_from) f['Available from'] = l.available_from
      if (l.price_period) f['Payment'] = l.price_period
      if (l.reference) f['Reference'] = l.reference
      if (l.avg_rent_area) f['Avg rent in area'] = `${l.avg_rent_area} EGP`
      break

    case 'mktlist':
      if (l.building_type) f['Building type'] = l.building_type
      if (l.square_footage_raw) f['Square footage'] = l.square_footage_raw
      if (l.parking_type) f['Parking'] = l.parking_type
      if (l.total_parking) f['Parking spaces'] = l.total_parking
      if (l.heating_type) f['Heating'] = l.heating_type
      if (l.cooling) f['Cooling'] = l.cooling
      if (l.flooring) f['Flooring'] = l.flooring
      if (l.basement_type) f['Basement'] = l.basement_type
      if (l.exterior_finish) f['Exterior'] = l.exterior_finish
      if (l.province) f['Province'] = l.province
      break
  }

  return f
})

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

useHead({ title: computed(() => displayTitle.value ? `${displayTitle.value} | RentGlobe` : 'Listing | RentGlobe') })
</script>

<style scoped>
@reference "tailwindcss";
.tag {
  @apply bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded;
}
</style>