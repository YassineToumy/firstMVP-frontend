<template>
  <div class="min-h-screen bg-[#F5F5F5]">
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-12">
      <div class="bg-white rounded-lg h-96 animate-pulse" />
    </div>

    <div v-else-if="l" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <!-- Image gallery -->
      <div class="bg-white rounded-lg overflow-hidden shadow-sm">
        <div class="relative aspect-[16/9] sm:aspect-[21/9] bg-gray-100 overflow-hidden">
          <img v-if="mainImage" :src="mainImage" :alt="l.title || l.city" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
        </div>
        <div v-if="imageList.length > 1" class="flex gap-1 p-2 overflow-x-auto">
          <button v-for="(img, i) in imageList.slice(0, 12)" :key="i" @click="currentImage = Number(i)"
            class="flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition"
            :class="currentImage === i ? 'border-[#111111]' : 'border-transparent opacity-70 hover:opacity-100'">
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Two column -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Title & price -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h1 class="text-2xl font-bold text-[#111111]">
              {{ l.title || `${l.property_type || 'Property'} in ${l.city || 'Unknown'}` }}
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              {{ [l.city, l.district, l.postal_code, l.province].filter(Boolean).join(', ') }}
            </p>

            <p class="text-3xl font-bold text-[#111111] mt-4">
              {{ formatPrice(l.price, l.currency) }}
              <span class="text-base font-normal text-gray-500">{{ l.price_period === 'yearly' ? '/year' : '/month' }}</span>
            </p>

            <!-- Key stats -->
            <div class="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
              <span v-if="l.bedrooms">{{ l.bedrooms }} bedrooms</span>
              <span v-if="l.bathrooms">{{ l.bathrooms }} bathrooms</span>
              <span v-if="l.rooms && l.rooms !== l.bedrooms">{{ l.rooms }} rooms</span>
              <span v-if="l.surface_m2">{{ l.surface_m2 }} m²</span>
              <span v-if="l.surface_sqft">{{ l.surface_sqft }} sqft</span>
              <span v-if="l.floor">Floor {{ l.floor }}</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-if="l.property_type" class="tag">{{ l.property_type }}</span>
              <span v-if="l.building_type" class="tag">{{ l.building_type }}</span>
              <span v-if="l.is_furnished === true" class="tag">Furnished</span>
              <span v-if="l.is_furnished === false" class="tag">Unfurnished</span>
              <span v-if="l.is_new" class="tag">New</span>
              <span v-if="l.energy_class" class="tag">Energy: {{ l.energy_class }}</span>
              <span v-if="l.ghg_class" class="tag">GHG: {{ l.ghg_class }}</span>
              <span v-if="l.property_condition" class="tag">{{ l.property_condition }}</span>
              <span v-if="l.status" class="tag">{{ l.status }}</span>
            </div>
          </div>

          <!-- Description -->
          <div v-if="l.description" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Description</h2>
            <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ l.description }}</p>
          </div>

          <!-- Features / Amenities -->
          <div v-if="featureList.length" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Features</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="(f, i) in featureList" :key="i" class="tag">{{ f }}</span>
            </div>
          </div>

          <!-- Rooms detail (Canada) -->
          <div v-if="l.rooms_detail && Array.isArray(l.rooms_detail) && l.rooms_detail.length" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-[#111111] mb-3">Rooms</h2>
            <div class="space-y-1 text-sm">
              <div v-for="(r, i) in l.rooms_detail" :key="i" class="flex justify-between text-gray-600">
                <span>{{ r.room || r.name }}</span>
                <span class="text-gray-800">{{ r.dimensions || r.size || '' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-6">

          <!-- Contact -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Contact</h3>
            <p v-if="l.agent_or_agency" class="text-sm text-gray-700">{{ l.agent_or_agency }}</p>
            <p v-if="l.agent_name && l.agent_name !== l.agent_or_agency" class="text-xs text-gray-500 mt-1">Agent: {{ l.agent_name }}</p>
            <p v-if="l.agency_name && l.agency_name !== l.agent_or_agency" class="text-xs text-gray-500 mt-1">Agency: {{ l.agency_name }}</p>
            <p v-if="l.agent_phone" class="text-xs text-gray-500 mt-1">{{ l.agent_phone }}</p>
            <a v-if="l.url" :href="l.url" target="_blank" class="mt-3 block text-xs text-gray-400 hover:text-gray-600 truncate">View original listing</a>
            <button class="mt-4 w-full py-2.5 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#333333] transition">
              Contact
            </button>
          </div>

          <!-- Property details -->
          <div v-if="Object.keys(details).length" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Property details</h3>
            <dl class="space-y-2 text-sm">
              <div v-for="(val, key) in details" :key="key" class="flex justify-between">
                <dt class="text-gray-500">{{ key }}</dt>
                <dd class="text-gray-800 font-medium text-right max-w-[60%]">{{ val }}</dd>
              </div>
            </dl>
          </div>

          <!-- Energy (France) -->
          <div v-if="l.energy_class || l.ghg_class" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Energy performance</h3>
            <dl class="space-y-2 text-sm">
              <div v-if="l.energy_class" class="flex justify-between">
                <dt class="text-gray-500">Energy class</dt>
                <dd class="font-bold text-lg">{{ l.energy_class }}</dd>
              </div>
              <div v-if="l.energy_value" class="flex justify-between">
                <dt class="text-gray-500">Energy value</dt>
                <dd>{{ l.energy_value }} kWh/m²/year</dd>
              </div>
              <div v-if="l.ghg_class" class="flex justify-between">
                <dt class="text-gray-500">GHG class</dt>
                <dd class="font-bold text-lg">{{ l.ghg_class }}</dd>
              </div>
              <div v-if="l.min_energy_cost && l.max_energy_cost" class="flex justify-between">
                <dt class="text-gray-500">Energy cost</dt>
                <dd>{{ l.min_energy_cost }} - {{ l.max_energy_cost }} EUR/year</dd>
              </div>
            </dl>
          </div>

          <!-- Price insights (Egypt) -->
          <div v-if="l.avg_rent_area" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-sm font-semibold text-[#111111] mb-3">Price insights</h3>
            <dl class="space-y-2 text-sm">
              <div v-if="l.avg_rent_area" class="flex justify-between">
                <dt class="text-gray-500">Avg rent in area</dt>
                <dd>{{ formatPrice(l.avg_rent_area, 'EGP') }}</dd>
              </div>
              <div v-if="l.vs_avg_pct" class="flex justify-between">
                <dt class="text-gray-500">vs Average</dt>
                <dd>{{ l.vs_avg_pct }}% {{ l.vs_avg_dir }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

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

// Images — handle jsonb array from VIEW
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

// Features + amenities merged
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

// Detail fields sidebar
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
  if (v.floor_type) d['Floor type'] = v.floor_type
  if (v.available_from) d['Available from'] = v.available_from
  if (v.compound) d['Compound'] = v.compound
  if (v.province) d['Province'] = v.province
  if (v.postal_code) d['Postal code'] = v.postal_code
  if (v.department_code) d['Department'] = v.department_code
  if (v.reference) d['Reference'] = v.reference
  if (v.square_footage_raw) d['Square footage'] = v.square_footage_raw
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
  @apply bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded;
}
</style>