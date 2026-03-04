<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl h-[400px] animate-pulse" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div class="lg:col-span-2 bg-white rounded-2xl h-64 animate-pulse" />
        <div class="bg-white rounded-2xl h-64 animate-pulse" />
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="l" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-gray-400 mb-4 animate-fade-in-up">
        <NuxtLink to="/listings" class="hover:text-gray-600 transition-colors">Listings</NuxtLink>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-gray-600">{{ l.city || 'Details' }}</span>
      </nav>

      <!-- Image gallery -->
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm animate-fade-in-up">
        <div class="relative aspect-[16/9] sm:aspect-[21/9] bg-gray-50 overflow-hidden group">
          <Transition name="image-fade" mode="out-in">
            <img
              v-if="mainImage"
              :key="currentImage"
              :src="mainImage"
              :alt="l.title || l.city"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-200">
              <span class="text-sm">No image available</span>
            </div>
          </Transition>

          <!-- Image nav arrows -->
          <template v-if="imageList.length > 1">
            <button
              @click="currentImage = (currentImage - 1 + imageList.length) % imageList.length"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              @click="currentImage = (currentImage + 1) % imageList.length"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Image counter -->
            <div class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs">
              {{ currentImage + 1 }} / {{ imageList.length }}
            </div>
          </template>
        </div>

        <!-- Thumbnails -->
        <div v-if="imageList.length > 1" class="flex gap-1.5 p-3 overflow-x-auto scrollbar-hide">
          <button
            v-for="(img, i) in imageList.slice(0, 12)"
            :key="i"
            @click="currentImage = Number(i)"
            class="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200"
            :class="currentImage === i ? 'border-[#0a0a0a] ring-1 ring-[#0a0a0a]' : 'border-transparent opacity-60 hover:opacity-100'"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Two columns -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left column -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Title & price card -->
          <div class="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up animation-delay-100">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-if="l.property_type" class="tag">{{ l.property_type }}</span>
              <span v-if="l.building_type" class="tag">{{ l.building_type }}</span>
              <span v-if="l.is_furnished === true" class="tag tag-green">Furnished</span>
              <span v-if="l.is_furnished === false" class="tag">Unfurnished</span>
              <span v-if="l.is_new" class="tag tag-violet">New</span>
              <span v-if="l.status" class="tag">{{ l.status }}</span>
            </div>

            <h1 class="text-2xl font-bold text-[#0a0a0a] leading-snug">
              {{ l.title || `${l.property_type || 'Property'} in ${l.city || 'Unknown'}` }}
            </h1>

            <p class="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ [l.city, l.district, l.postal_code, l.province].filter(Boolean).join(', ') }}
            </p>

            <!-- Price -->
            <div class="mt-5 pt-5 border-t border-gray-100">
              <p class="text-3xl font-bold text-[#0a0a0a]">
                {{ formatPrice(l.price, l.currency) }}
                <span class="text-base font-normal text-gray-400">
                  {{ l.price_period === 'yearly' ? '/year' : '/month' }}
                </span>
              </p>
            </div>

            <!-- Key stats -->
            <div class="flex flex-wrap gap-4 mt-5">
              <div v-if="l.bedrooms" class="stat-box">
                <Icon name="lucide:bed" class="w-5 h-5 text-orange-400 mb-1" />
                <span class="stat-val">{{ l.bedrooms }}</span>
                <span class="stat-label">Bedrooms</span>
              </div>
              <div v-if="l.bathrooms" class="stat-box">
                <Icon name="lucide:bath" class="w-5 h-5 text-orange-400 mb-1" />
                <span class="stat-val">{{ l.bathrooms }}</span>
                <span class="stat-label">Bathrooms</span>
              </div>
              <div v-if="l.rooms && l.rooms !== l.bedrooms" class="stat-box">
                <Icon name="lucide:layout-grid" class="w-5 h-5 text-orange-400 mb-1" />
                <span class="stat-val">{{ l.rooms }}</span>
                <span class="stat-label">Rooms</span>
              </div>
              <div v-if="l.surface_m2" class="stat-box">
                <Icon name="lucide:ruler" class="w-5 h-5 text-orange-400 mb-1" />
                <span class="stat-val">{{ l.surface_m2 }}</span>
                <span class="stat-label">m²</span>
              </div>
              <div v-if="l.surface_sqft" class="stat-box">
                <Icon name="lucide:ruler" class="w-5 h-5 text-orange-400 mb-1" />
                <span class="stat-val">{{ l.surface_sqft }}</span>
                <span class="stat-label">sqft</span>
              </div>
              <div v-if="l.floor" class="stat-box">
                <Icon name="lucide:layers" class="w-5 h-5 text-orange-400 mb-1" />
                <span class="stat-val">{{ l.floor }}</span>
                <span class="stat-label">Floor</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div v-if="l.description" class="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up animation-delay-200">
            <h2 class="text-base font-semibold text-[#0a0a0a] mb-3">Description</h2>
            <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ l.description }}</p>
          </div>

          <!-- Features / Amenities -->
          <div v-if="featureList.length" class="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up animation-delay-300">
            <h2 class="text-base font-semibold text-[#0a0a0a] mb-4">Features &amp; amenities</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div v-for="(f, i) in featureList" :key="i" class="flex items-center gap-2 text-sm text-gray-600 py-1.5">
                <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ f }}
              </div>
            </div>
          </div>

          <!-- Rooms detail -->
          <div v-if="l.rooms_detail && Array.isArray(l.rooms_detail) && l.rooms_detail.length" class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-base font-semibold text-[#0a0a0a] mb-3">Rooms</h2>
            <div class="space-y-2">
              <div v-for="(r, i) in l.rooms_detail" :key="i" class="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                <span class="text-gray-600">{{ r.room || r.name }}</span>
                <span class="text-gray-800 font-medium">{{ r.dimensions || r.size || '' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-6">

          <!-- Contact card -->
          <div class="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up animation-delay-100">
            <h3 class="text-sm font-semibold text-[#0a0a0a] mb-4">Contact</h3>
            <div class="space-y-2">
              <p v-if="l.agent_or_agency" class="text-sm text-gray-700 font-medium">{{ l.agent_or_agency }}</p>
              <p v-if="l.agent_name && l.agent_name !== l.agent_or_agency" class="text-xs text-gray-500">Agent: {{ l.agent_name }}</p>
              <p v-if="l.agency_name && l.agency_name !== l.agent_or_agency" class="text-xs text-gray-500">Agency: {{ l.agency_name }}</p>
              <p v-if="l.agent_phone" class="text-xs text-gray-500">{{ l.agent_phone }}</p>
            </div>

            <button class="mt-5 w-full py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all">
              Contact agent
            </button>
            <button class="mt-2 w-full py-3 border border-gray-200 text-gray-800 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all">
              Schedule visit
            </button>
            <a
              v-if="l.url"
              :href="l.url"
              target="_blank"
              class="mt-3 block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              View original listing ↗
            </a>
          </div>

          <!-- Property details -->
          <div v-if="Object.keys(details).length" class="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up animation-delay-200">
            <h3 class="text-sm font-semibold text-[#0a0a0a] mb-4">Property details</h3>
            <dl class="space-y-3">
              <div v-for="(val, key) in details" :key="key" class="flex justify-between text-sm">
                <dt class="text-gray-500">{{ key }}</dt>
                <dd class="text-gray-800 font-medium text-right max-w-[55%]">{{ val }}</dd>
              </div>
            </dl>
          </div>

          <!-- Energy performance -->
          <div v-if="l.energy_class || l.ghg_class" class="bg-white rounded-2xl shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#0a0a0a] mb-4">Energy performance</h3>
            <dl class="space-y-3 text-sm">
              <div v-if="l.energy_class" class="flex justify-between items-center">
                <dt class="text-gray-500">Energy class</dt>
                <dd class="text-lg font-bold px-3 py-0.5 rounded bg-green-50 text-green-700">{{ l.energy_class }}</dd>
              </div>
              <div v-if="l.energy_value" class="flex justify-between">
                <dt class="text-gray-500">Energy value</dt>
                <dd class="text-gray-800">{{ l.energy_value }} kWh/m²/year</dd>
              </div>
              <div v-if="l.ghg_class" class="flex justify-between items-center">
                <dt class="text-gray-500">GHG class</dt>
                <dd class="text-lg font-bold px-3 py-0.5 rounded bg-orange-50 text-orange-600">{{ l.ghg_class }}</dd>
              </div>
              <div v-if="l.min_energy_cost && l.max_energy_cost" class="flex justify-between">
                <dt class="text-gray-500">Energy cost</dt>
                <dd class="text-gray-800">{{ l.min_energy_cost }}–{{ l.max_energy_cost }} EUR/yr</dd>
              </div>
            </dl>
          </div>

          <!-- Price insights (Egypt) -->
          <div v-if="l.avg_rent_area" class="bg-white rounded-2xl shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#0a0a0a] mb-4">Price insights</h3>
            <dl class="space-y-3 text-sm">
              <div v-if="l.avg_rent_area" class="flex justify-between">
                <dt class="text-gray-500">Avg rent in area</dt>
                <dd class="text-gray-800 font-medium">{{ formatPrice(l.avg_rent_area, 'EGP') }}</dd>
              </div>
              <div v-if="l.vs_avg_pct" class="flex justify-between">
                <dt class="text-gray-500">vs Average</dt>
                <dd :class="l.vs_avg_dir === 'less' ? 'text-emerald-600' : 'text-red-500'" class="font-medium">
                  {{ l.vs_avg_pct }}% {{ l.vs_avg_dir }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="max-w-7xl mx-auto px-4 py-24 text-center">
      <p class="text-gray-500">Listing not found.</p>
      <NuxtLink to="/listings" class="mt-3 inline-block text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
        ← Back to listings
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchListing } = useListings()

const source = route.params.source as string
const id = route.params.id as string
const currentImage = ref(0)
const l = ref<Record<string, any> | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetchListing(source, id)
    l.value = res.data
  } catch (e) {
    console.error('Failed to load listing:', e)
  } finally {
    loading.value = false
  }
})

const imageList = computed(() => {
  if (!l.value) return []
  const imgs = l.value.images
  if (Array.isArray(imgs)) return imgs
  if (typeof imgs === 'string') {
    try { return JSON.parse(imgs) } catch { return [] }
  }
  return l.value.thumbnail ? [l.value.thumbnail] : []
})

const mainImage = computed(() => imageList.value[currentImage.value] || null)

const featureList = computed(() => {
  if (!l.value) return []
  const result: string[] = []
  for (const key of ['features', 'amenities']) {
    const val = l.value[key]
    if (Array.isArray(val)) result.push(...val.filter((f: any) => typeof f === 'string'))
    else if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val)
        if (Array.isArray(parsed)) result.push(...parsed.filter((f: any) => typeof f === 'string'))
      } catch {}
    }
  }
  if (l.value.building_amenities && typeof l.value.building_amenities === 'string' && l.value.building_amenities.length > 2) {
    result.push(l.value.building_amenities)
  }
  if (l.value.appliances && typeof l.value.appliances === 'string' && l.value.appliances.length > 2) {
    result.push(l.value.appliances)
  }
  return [...new Set(result)]
})

const details = computed(() => {
  if (!l.value) return {}
  const d: Record<string, any> = {}
  const v = l.value
  if (v.rooms) d['Rooms'] = v.rooms
  if (v.bedrooms) d['Bedrooms'] = v.bedrooms
  if (v.bathrooms) d['Bathrooms'] = v.bathrooms
  if (v.shower_rooms) d['Shower rooms'] = v.shower_rooms
  if (v.surface_m2) d['Surface'] = `${v.surface_m2} m²`
  if (v.surface_sqft) d['Surface (sqft)'] = `${v.surface_sqft} sqft`
  if (v.floor) d['Floor'] = v.floor
  if (v.heating) d['Heating'] = v.heating
  if (v.cooling) d['Cooling'] = v.cooling
  if (v.flooring) d['Flooring'] = v.flooring
  if (v.parking_type) d['Parking type'] = v.parking_type
  if (v.parking_spaces) d['Parking spaces'] = v.parking_spaces
  if (v.basement_type) d['Basement'] = v.basement_type
  if (v.exterior_finish) d['Exterior'] = v.exterior_finish
  if (v.building_type) d['Building type'] = v.building_type
  if (v.terraces) d['Terraces'] = v.terraces
  if (v.balconies) d['Balconies'] = v.balconies
  if (v.cellars) d['Cellars'] = v.cellars
  if (v.has_elevator === true) d['Elevator'] = 'Yes'
  if (v.has_elevator === false) d['Elevator'] = 'No'
  if (v.optical_fiber === true) d['Fiber optic'] = 'Yes'
  if (v.charges) d['Charges'] = `${v.charges} ${v.currency}`
  if (v.agency_fee) d['Agency fee'] = `${v.agency_fee} ${v.currency}`
  if (v.rent_excluding_charges) d['Rent excl. charges'] = `${v.rent_excluding_charges} ${v.currency}`
  if (v.price_per_m2) d['Price/m²'] = `${v.price_per_m2} ${v.currency}`
  if (v.property_condition) d['Condition'] = v.property_condition
  if (v.property_age) d['Age'] = v.property_age
  if (v.orientation) d['Orientation'] = v.orientation
  if (v.available_from) d['Available from'] = v.available_from
  if (v.compound) d['Compound'] = v.compound
  if (v.province) d['Province'] = v.province
  if (v.postal_code) d['Postal code'] = v.postal_code
  if (v.department_code) d['Department'] = v.department_code
  if (v.reference) d['Reference'] = v.reference
  if (v.listed_date) d['Listed'] = v.listed_date
  if (v.added_on) d['Added on'] = v.added_on
  return d
})

function formatPrice(price: number, currency: string): string {
  const locales: Record<string, string> = { EUR: 'fr-FR', TND: 'fr-TN', EGP: 'en-EG', CAD: 'en-CA' }
  try {
    return new Intl.NumberFormat(locales[currency] || 'en-US', {
      style: 'currency', currency, maximumFractionDigits: 0,
    }).format(price)
  } catch {
    return `${price?.toLocaleString()} ${currency}`
  }
}

useHead({ title: computed(() => l.value ? `${l.value.title || l.value.city || 'Listing'} | RentGlobe` : 'Listing | RentGlobe') })
</script>

<style scoped>
@reference "tailwindcss";
.tag {
  @apply bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-lg;
}
.tag-green {
  @apply bg-green-50 text-green-700;
}
.tag-violet {
  @apply bg-orange-50 text-orange-600;
}
.stat-box {
  @apply flex flex-col items-center px-5 py-3 bg-[#FAFAFA] rounded-xl;
}
.stat-val {
  @apply text-lg font-bold text-[#0a0a0a];
}
.stat-label {
  @apply text-[11px] text-gray-500 mt-0.5;
}
.image-fade-enter-active,
.image-fade-leave-active {
  transition: opacity 0.25s ease;
}
.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>