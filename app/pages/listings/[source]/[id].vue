<template>
  <div class="min-h-screen bg-[#F5F5F5]">
    <!-- Loading -->
    <div v-if="pending" class="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div class="bg-white rounded-2xl h-[420px] animate-pulse" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-2xl h-48 animate-pulse" />
          <div class="bg-white rounded-2xl h-32 animate-pulse" />
        </div>
        <div class="bg-white rounded-2xl h-64 animate-pulse" />
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="listing" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <!-- Back button -->
      <NuxtLink to="/listings" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#111111] mb-4 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back to listings
      </NuxtLink>

      <!-- ═══ IMAGE GALLERY ═══ -->
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div class="relative aspect-[16/9] sm:aspect-[2.2/1] bg-gray-100 overflow-hidden group">
          <img
            v-if="mainImage"
            :src="mainImage"
            :alt="listing.title || listing.city"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-50">
            <div class="text-center text-gray-300">
              <svg class="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span class="text-sm">No image available</span>
            </div>
          </div>

          <!-- Image counter badge -->
          <div v-if="images.length > 1" class="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            {{ currentImage + 1 }} / {{ images.length }}
          </div>

          <!-- Nav arrows -->
          <button
            v-if="images.length > 1 && currentImage > 0"
            @click="currentImage--"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition hover:bg-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            v-if="images.length > 1 && currentImage < images.length - 1"
            @click="currentImage++"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition hover:bg-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Thumbnails -->
        <div v-if="images.length > 1" class="flex gap-2 p-3 overflow-x-auto">
          <button
            v-for="(img, i) in images.slice(0, 12)"
            :key="i"
            @click="currentImage = Number(i)"
            class="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200"
            :class="currentImage === Number(i) ? 'border-[#111111] shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- ═══ TWO COLUMN LAYOUT ═══ -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left column -->
        <div class="lg:col-span-2 space-y-5">

          <!-- ── Title & Price ── -->
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div class="flex-1">
                <h1 class="text-2xl font-bold text-[#111111] leading-tight">
                  {{ listing.title || `${listing.property_type} in ${listing.city}` }}
                </h1>
                <p class="text-sm text-gray-500 mt-1.5 flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ listing.city }}<span v-if="listing.district">, {{ listing.district }}</span>
                  <span v-if="listing.postal_code"> — {{ listing.postal_code }}</span>
                </p>
              </div>
              <div class="sm:text-right">
                <p class="text-3xl font-bold text-[#111111]">
                  {{ formatPrice(listing.price, listing.currency) }}
                </p>
                <span class="text-sm text-gray-400">per month</span>
              </div>
            </div>

            <!-- Key stats pills -->
            <div class="flex flex-wrap gap-3 mt-5 pt-5 border-t border-gray-100">
              <div v-if="listing.bedrooms" class="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl">
                <svg class="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"/></svg>
                <span class="text-sm font-medium text-gray-700">{{ listing.bedrooms }} <span class="text-gray-400 font-normal">beds</span></span>
              </div>
              <div v-if="listing.bathrooms" class="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl">
                <svg class="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span class="text-sm font-medium text-gray-700">{{ listing.bathrooms }} <span class="text-gray-400 font-normal">baths</span></span>
              </div>
              <div v-if="listing.surface_m2" class="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl">
                <svg class="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                <span class="text-sm font-medium text-gray-700">{{ listing.surface_m2 }} <span class="text-gray-400 font-normal">m²</span></span>
              </div>
              <div v-if="listing.rooms" class="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl">
                <svg class="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/></svg>
                <span class="text-sm font-medium text-gray-700">{{ listing.rooms }} <span class="text-gray-400 font-normal">rooms</span></span>
              </div>
              <div v-if="listing.floor" class="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl">
                <svg class="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                <span class="text-sm font-medium text-gray-700">Floor {{ listing.floor }}</span>
              </div>
            </div>

            <!-- Quick tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-if="listing.property_type" class="text-xs font-medium px-3 py-1 rounded-full bg-[#111111] text-white">{{ listing.property_type }}</span>
              <span v-if="listing.is_furnished" class="text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600">Furnished</span>
              <span v-if="listing.is_furnished === false" class="text-xs font-medium px-3 py-1 rounded-full border border-gray-200 text-gray-600">Unfurnished</span>
              <span v-if="listing.energy_class" class="text-xs font-medium px-3 py-1 rounded-full border border-green-200 text-green-700 bg-green-50">Energy {{ listing.energy_class }}</span>
            </div>
          </div>

          <!-- ── Description ── -->
          <div v-if="listing.description" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-4">Description</h2>
            <div class="relative">
              <p
                class="text-sm text-gray-600 leading-relaxed whitespace-pre-line transition-all duration-300"
                :class="descriptionExpanded ? '' : 'max-h-[160px] overflow-hidden'"
              >{{ listing.description }}</p>

              <!-- Gradient fade -->
              <div
                v-if="!descriptionExpanded && isDescriptionLong"
                class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"
              />
            </div>

            <button
              v-if="isDescriptionLong"
              @click="descriptionExpanded = !descriptionExpanded"
              class="mt-3 text-sm font-medium text-[#111111] hover:underline flex items-center gap-1 transition"
            >
              {{ descriptionExpanded ? 'Show less' : 'Read more' }}
              <svg class="w-4 h-4 transition-transform" :class="descriptionExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <!-- ── Features & Amenities ── -->
          <div v-if="featuresList.length" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-4">Features & Amenities</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                v-for="f in displayedFeatures"
                :key="f"
                class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                <span class="text-sm text-gray-700">{{ f }}</span>
              </div>
            </div>

            <button
              v-if="featuresList.length > 9"
              @click="featuresExpanded = !featuresExpanded"
              class="mt-4 text-sm font-medium text-[#111111] hover:underline flex items-center gap-1 transition"
            >
              {{ featuresExpanded ? 'Show less' : `Show all ${featuresList.length} features` }}
              <svg class="w-4 h-4 transition-transform" :class="featuresExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        </div>

        <!-- ═══ RIGHT SIDEBAR ═══ -->
        <div class="space-y-5">

          <!-- ── Contact card ── -->
          <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <div>
                <p v-if="contactName" class="text-sm font-semibold text-[#111111]">{{ contactName }}</p>
                <p v-else class="text-sm text-gray-400">Private owner</p>
                <p class="text-xs text-gray-400">Listed on {{ listing.source || source }}</p>
              </div>
            </div>

            <button class="w-full py-3 bg-[#111111] text-white text-sm font-medium rounded-xl hover:bg-[#222222] transition-all active:scale-[0.98]">
              Contact owner
            </button>

            <a
              v-if="listing.url"
              :href="listing.url"
              target="_blank"
              rel="noopener"
              class="mt-3 w-full py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              View original listing
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>

          <!-- ── Property details ── -->
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-4">Property details</h3>
            <dl class="space-y-3">
              <div v-for="(val, key) in detailFields" :key="key" class="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <dt class="text-sm text-gray-400">{{ key }}</dt>
                <dd class="text-sm text-[#111111] font-medium">{{ val }}</dd>
              </div>
            </dl>
          </div>

          <!-- ── Price breakdown ── -->
          <div v-if="listing.charges || listing.price_per_m2" class="bg-white rounded-2xl shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-4">Price breakdown</h3>
            <dl class="space-y-3">
              <div class="flex items-center justify-between py-1.5 border-b border-gray-50">
                <dt class="text-sm text-gray-400">Monthly rent</dt>
                <dd class="text-sm text-[#111111] font-medium">{{ formatPrice(listing.price, listing.currency) }}</dd>
              </div>
              <div v-if="listing.charges" class="flex items-center justify-between py-1.5 border-b border-gray-50">
                <dt class="text-sm text-gray-400">Charges</dt>
                <dd class="text-sm text-[#111111] font-medium">{{ formatPrice(listing.charges, listing.currency) }}</dd>
              </div>
              <div v-if="listing.price_per_m2" class="flex items-center justify-between py-1.5">
                <dt class="text-sm text-gray-400">Price / m²</dt>
                <dd class="text-sm text-[#111111] font-medium">{{ formatPrice(listing.price_per_m2, listing.currency) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="max-w-7xl mx-auto px-4 py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <p class="text-gray-500 mb-2">Listing not found</p>
      <NuxtLink to="/listings" class="text-sm font-medium text-[#111111] hover:underline">Back to listings</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchListing } = useListings()

const source = route.params.source as string
const id = route.params.id as string
const currentImage = ref<number>(0)
const descriptionExpanded = ref(false)
const featuresExpanded = ref(false)

const { data: res, pending } = await useAsyncData(`listing-${source}-${id}`, () => fetchListing(source, id))
const listing = computed(() => res.value?.data || null)

// ── Parse PostgreSQL TEXT[] arrays ──
function parseArrayField(val: any): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val.filter(Boolean)
  if (typeof val === 'string') {
    if (val.startsWith('{') && val.endsWith('}')) {
      return val.slice(1, -1).split(',').map(s => s.replace(/^"|"$/g, '')).filter(Boolean)
    }
    if (val.startsWith('http')) return [val]
  }
  return []
}

// ── Images ──
const images = computed(() => {
  if (!listing.value) return []
  const fromImages = parseArrayField(listing.value.images)
  const fromPhotos = parseArrayField(listing.value.photos)
  const result = fromImages.length ? fromImages : fromPhotos
  if (!result.length && listing.value.thumbnail) return [listing.value.thumbnail]
  return result
})
const mainImage = computed(() => images.value?.[currentImage.value] || null)

// ── Description ──
const isDescriptionLong = computed(() => {
  if (!listing.value?.description) return false
  return listing.value.description.length > 400 || listing.value.description.split('\n').length > 6
})

// ── Features ──
const featuresList = computed(() => {
  if (!listing.value) return []
  return [...parseArrayField(listing.value.features), ...parseArrayField(listing.value.amenities)]
})
const displayedFeatures = computed(() => {
  if (featuresExpanded.value) return featuresList.value
  return featuresList.value.slice(0, 9)
})

// ── Contact name ──
const contactName = computed(() => {
  if (!listing.value) return null
  return listing.value.agency_name || listing.value.agent_name || listing.value.seller_name || listing.value.agent_or_agency || null
})

// ── Property details ──
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
  if (l.energy_class) fields['Energy class'] = l.energy_class
  if (l.ghg_class) fields['GHG class'] = l.ghg_class
  if (l.parking_spots) fields['Parking'] = `${l.parking_spots} spots`
  if (l.has_elevator) fields['Elevator'] = 'Yes'
  if (l.optical_fiber) fields['Fiber optic'] = l.optical_fiber
  return fields
})

// ── Price formatter ──
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