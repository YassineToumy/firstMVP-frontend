<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          :src="heroImage"
          alt=""
          class="w-full h-full object-cover"
        />
        <!-- Dark overlay with gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
      </div>

      <!-- Animated accent blobs (on top of image) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-600/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-600/15 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-6 animate-fade-in-up">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping-soft" />
          <span>{{ totalListings }} active listings across 4 countries</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight animate-fade-in-up animation-delay-100">
          Find your perfect
          <span class="relative">
            <span class="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">rental home</span>
          </span>
        </h1>

        <p class="mt-5 text-lg text-gray-400 max-w-xl mx-auto animate-fade-in-up animation-delay-200">
          Browse thousands of verified rental listings across
          France, Tunisia, Egypt &amp; Canada — all in one place.
        </p>

        <!-- Search bar -->
        <div class="mt-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
          <div class="flex flex-col sm:flex-row bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-2 gap-2">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchCity"
                type="text"
                placeholder="Search by city, district, or keyword..."
                class="w-full pl-10 pr-4 py-3.5 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                @keyup.enter="goSearch"
              />
            </div>

            <select v-model="searchType" class="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-violet-500/50 cursor-pointer">
              <option value="" class="bg-[#111]">All types</option>
              <option value="apartment" class="bg-[#111]">Apartment</option>
              <option value="house" class="bg-[#111]">House</option>
            </select>

            <button
              @click="goSearch"
              class="px-8 py-3.5 bg-white text-[#0a0a0a] text-sm font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all duration-200"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Quick region chips -->
        <div class="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in-up animation-delay-400">
          <button
            v-for="r in quickRegions"
            :key="r.code"
            @click="switchRegionAndSearch(r.code)"
            class="px-4 py-2 text-xs text-gray-400 border border-white/10 rounded-full hover:border-white/30 hover:text-white transition-all duration-200"
          >
            {{ r.flag }} {{ r.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Region stats bar -->
    <section class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div
            v-for="(r, i) in regionStats"
            :key="r.code"
            class="text-center group cursor-pointer"
            :class="{ 'animate-fade-in-up': true }"
            :style="{ animationDelay: `${i * 100}ms` }"
            @click="switchRegionAndSearch(r.code)"
          >
            <p class="text-2xl sm:text-3xl font-bold text-[#0a0a0a] tabular-nums group-hover:text-violet-600 transition-colors">
              {{ animatedCount(r.count) }}
            </p>
            <p class="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">
              {{ r.name }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent listings -->
    <section class="bg-[#FAFAFA]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-[#0a0a0a]">Recent listings</h2>
            <p class="text-sm text-gray-500 mt-1">
              Showing latest from {{ region.current.name }}
            </p>
          </div>
          <NuxtLink
            to="/listings"
            class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#0a0a0a] hover:text-violet-600 transition-colors group"
          >
            View all
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loadingListings" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden">
            <div class="aspect-[4/3] bg-gray-100 animate-pulse" />
            <div class="p-4 space-y-3">
              <div class="h-5 bg-gray-100 rounded animate-pulse w-2/3" />
              <div class="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
              <div class="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
            </div>
          </div>
        </div>

        <!-- Listings grid -->
        <div v-else-if="listings.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ListingsListingCard v-for="(l, i) in listings" :key="l.source_id" :listing="l" :style="{ animationDelay: `${i * 50}ms` }" class="animate-fade-in-up" />
        </div>

        <p v-else class="text-center py-12 text-gray-500 text-sm">No listings found for this region.</p>

        <!-- Mobile CTA -->
        <div class="mt-8 text-center sm:hidden">
          <NuxtLink
            to="/listings"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-sm font-medium rounded-xl hover:bg-[#222] transition-colors"
          >
            View all listings
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 class="text-2xl font-bold text-[#0a0a0a] text-center">How RentGlobe works</h2>
        <p class="text-sm text-gray-500 text-center mt-2 max-w-md mx-auto">
          We aggregate rental listings from trusted sources across multiple countries
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          <div v-for="(step, i) in steps" :key="i" class="text-center group">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-[#FAFAFA] border border-gray-100 flex items-center justify-center group-hover:border-violet-200 group-hover:bg-violet-50 transition-all duration-300">
              <span class="text-2xl">{{ step.icon }}</span>
            </div>
            <h3 class="mt-4 font-semibold text-[#0a0a0a]">{{ step.title }}</h3>
            <p class="mt-2 text-sm text-gray-500 max-w-xs mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#0a0a0a]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">
          Ready to find your next home?
        </h2>
        <p class="mt-3 text-gray-400 max-w-md mx-auto text-sm">
          Join thousands of renters who discovered their ideal property through RentGlobe.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/listings"
            class="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0a0a0a] text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Browse listings
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-colors"
          >
            Create account
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/composables/useListings'

const region = useRegionStore()
const { fetchListings, fetchRegions } = useListings()
const router = useRouter()

const searchCity = ref('')
const searchType = ref('')
const listings = ref<Listing[]>([])
const regionStats = ref<{ code: string; name: string; currency: string; count: number }[]>([])
const loadingListings = ref(true)

// Dark modern building facade at night — by Mike Hindle on Unsplash (free commercial use)
// Replace with /images/hero-bg.jpg once downloaded to your public/ folder
const heroImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop'

const totalListings = computed(() =>
  regionStats.value.reduce((s, r) => s + (r.count || 0), 0).toLocaleString()
)

const quickRegions = [
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'tn', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'eg', name: 'Egypt', flag: '🇪🇬' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
]

const steps = [
  { icon: '🔍', title: 'Search', desc: 'Filter by city, price, type, and more across 4 countries.' },
  { icon: '🏠', title: 'Compare', desc: 'View detailed listings with photos, features, and pricing.' },
  { icon: '📞', title: 'Connect', desc: 'Contact landlords or agents directly from the listing page.' },
]

function animatedCount(count: number | undefined) {
  return count?.toLocaleString() || '—'
}

async function loadFeatured() {
  loadingListings.value = true
  try {
    const res = await fetchListings({ per_page: 8 })
    listings.value = res.data
  } catch (e) {
    console.error('Failed to load featured listings:', e)
  } finally {
    loadingListings.value = false
  }
}

async function loadRegions() {
  try {
    const res = await fetchRegions()
    regionStats.value = res.data
  } catch (e) {
    console.error('Failed to load regions:', e)
  }
}

function goSearch() {
  const q: Record<string, string> = {}
  if (searchCity.value) q.city = searchCity.value
  if (searchType.value) q.property_type = searchType.value
  router.push({ path: '/listings', query: q })
}

function switchRegionAndSearch(code: string) {
  region.setRegion(code)
  router.push('/listings')
}

watch(() => region.currentCode, () => loadFeatured())

onMounted(() => {
  loadFeatured()
  loadRegions()
})

useHead({ title: 'RentGlobe — Find your next rental home' })
</script>

<style>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ping-soft {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out both;
}
.animate-ping-soft {
  animation: ping-soft 2s ease-in-out infinite;
}
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-2000 { animation-delay: 2000ms; }
</style>