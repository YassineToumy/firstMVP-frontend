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
        <div class="absolute inset-0 bg-[#0a0a0a]/85" />
      </div>

      <!-- Animated accent blobs -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-600/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-400/10 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-6 animate-fade-in-up">
          <span class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping-soft" />
          <span>{{ $t('home.badge', { count: totalListings }) }}</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight animate-fade-in-up animation-delay-100 max-w-3xl">
          {{ $t('home.headline') }}
          <span class="text-orange-400">{{ $t('home.headlineHighlight') }}</span>
          {{ $t('home.headlineEnd') }}
        </h1>

        <!-- Declaration paragraph -->
        <p class="mt-5 text-base text-gray-400 max-w-2xl animate-fade-in-up animation-delay-200 leading-relaxed">
          {{ $t('home.subtext') }}
        </p>

        <!-- Search bar -->
        <div class="mt-10 max-w-3xl animate-fade-in-up animation-delay-300">
          <div class="flex flex-col sm:flex-row bg-white rounded-2xl p-2 gap-2 shadow-xl">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchCity"
                type="text"
                :placeholder="$t('home.searchPlaceholder')"
                class="w-full pl-10 pr-4 py-3.5 bg-transparent text-gray-900 text-sm placeholder-gray-400 focus:outline-none"
                @keyup.enter="goSearch"
              />
            </div>

            <select v-model="searchType" class="px-4 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-orange-400 cursor-pointer bg-white">
              <option value="">{{ $t('home.allTypes') }}</option>
              <option value="apartment">{{ $t('home.apartment') }}</option>
              <option value="house">{{ $t('home.house') }}</option>
            </select>

            <button
              @click="goSearch"
              class="px-8 py-3.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all duration-200"
            >
              {{ $t('home.search') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats bar -->
     <section class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-gray-100">
          <div
            v-for="(r, i) in regionStats"
            :key="r.code"
            class="text-center group cursor-pointer px-6 py-2"
            :style="{ animationDelay: `${i * 100}ms` }"
           @click="switchRegionAndSearch(r.code)"
          >
            <p class="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums group-hover:text-orange-500 transition-colors">
              {{ animatedCount(r.count) }}
            </p>
            <p class="text-xs text-gray-500 mt-1.5 group-hover:text-gray-700 transition-colors flex items-center justify-center gap-1.5">
              <img :src="`https://flagcdn.com/20x15/${r.code.toLowerCase()}.png`" :alt="r.name" class="w-4 rounded-sm" />
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
            <h2 class="text-2xl font-bold text-gray-900">{{ $t('home.recentListings') }}</h2>
            <p class="text-sm text-gray-500 mt-1">
              <template v-if="localSelectedCode">{{ $t('home.latestIn', { region: region.current.name }) }}</template>
              <template v-else>{{ $t('home.selectRegion') }}</template>
            </p>
          </div>
          <NuxtLink
            v-if="localSelectedCode"
            to="/listings"
            class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors group"
          >
            {{ $t('home.viewAll') }}
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Prompt — no region selected yet -->
        <div v-if="!localSelectedCode" class="py-16 flex flex-col items-center justify-center gap-4 text-center">
          <div class="w-16 h-16 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center">
            <Icon name="lucide:globe" class="w-8 h-8 text-orange-400" />
          </div>
          <p class="text-gray-700 font-medium">{{ $t('home.chooseRegion') }}</p>
          <p class="text-sm text-gray-400 max-w-xs">{{ $t('home.chooseRegionDesc') }}</p>
        </div>

        <!-- Loading skeleton -->
        <div v-else-if="loadingListings" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden border border-gray-100">
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

        <p v-else class="text-center py-12 text-gray-500 text-sm">{{ $t('home.noListings') }}</p>

        <!-- View all button — visible on all sizes -->
        <div v-if="listings.length && localSelectedCode" class="mt-10 text-center">
          <NuxtLink
            to="/listings"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-orange-200"
          >
            {{ $t('home.viewAllListings') }}
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
        <div class="text-center mb-12">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">{{ $t('home.howItWorks') }}</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.howItWorksTitle') }}</h2>
          <p class="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            {{ $t('home.howItWorksDesc') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          <div v-for="(step, i) in steps" :key="i" class="text-center group relative">
            <!-- Connector line -->
            <div v-if="i < 2" class="hidden sm:block absolute top-7 left-[calc(50%+2.5rem)] right-[-calc(50%-2.5rem)] h-px bg-gray-200 z-0" />

            <div class="relative z-10 w-14 h-14 mx-auto rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center group-hover:bg-orange-100 group-hover:border-orange-300 transition-all duration-300">
              <Icon :name="step.icon" class="w-7 h-7 text-orange-500" />
            </div>
            <div class="mt-3 w-6 h-6 mx-auto rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
              {{ i + 1 }}
            </div>
            <h3 class="mt-3 font-semibold text-gray-900">{{ step.title }}</h3>
            <p class="mt-2 text-sm text-gray-500 max-w-xs mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Region explorer -->
    <section class="bg-[#FAFAFA]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-900">{{ $t('home.exploreByCountry') }}</h2>
          <p class="text-sm text-gray-500 mt-2">{{ $t('home.discoverMarkets') }}</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            v-for="r in countryCards"
            :key="r.code"
            @click="switchRegionAndSearch(r.code)"
            class="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-6 text-left hover:border-orange-200 hover:shadow-md transition-all duration-300"
          >
            <img :src="`https://flagcdn.com/40x30/${r.code.toLowerCase()}.png`" :alt="r.name" class="w-10 h-auto mb-3 rounded" />
            <h3 class="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{{ r.name }}</h3>
            <p class="text-xs text-gray-500 mt-1">{{ r.currency }}</p>
            <div v-if="regionCountMap[r.code]" class="mt-3 text-sm font-semibold text-orange-500">
              {{ regionCountMap[r.code]?.toLocaleString() }} {{ $t('home.listings') }}
            </div>
            <div class="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-orange-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">
          {{ $t('home.readyTitle') }}
        </h2>
        <p class="mt-3 text-orange-100 max-w-md mx-auto text-sm">
          {{ $t('home.readyDesc') }}
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/listings"
            class="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 transition-colors"
          >
            {{ $t('home.browseListings') }}
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center px-8 py-3 border-2 border-white/40 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors"
          >
            {{ $t('home.createAccount') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/composables/useListings'

const { t } = useI18n()
const region = useRegionStore()
const { fetchListings, fetchRegions } = useListings()
const router = useRouter()

const searchCity = ref('')
const searchType = ref('')
const listings = ref<Listing[]>([])
const regionStats = ref<{ code: string; name: string; currency: string; count: number }[]>([])
const loadingListings = ref(false)
const localSelectedCode = ref('')

const heroImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop'

const totalListings = computed(() =>
  regionStats.value.reduce((s, r) => s + (r.count || 0), 0).toLocaleString()
)

const regionCountMap = computed(() => {
  const map: Record<string, number> = {}
  for (const r of regionStats.value) {
    map[r.code.toUpperCase()] = r.count
  }
  return map
})

const quickRegions = [
  { code: 'FR', name: 'France' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'EG', name: 'Egypt' },
  { code: 'CA', name: 'Canada' },
]

const countryCards = [
  { code: 'FR', name: 'France', currency: 'EUR — Euro' },
  { code: 'TN', name: 'Tunisia', currency: 'TND — Dinar' },
  { code: 'EG', name: 'Egypt', currency: 'EGP — Pound' },
  { code: 'CA', name: 'Canada', currency: 'CAD — Dollar' },
]

const steps = computed(() => [
  { icon: 'lucide:search', title: t('home.step1Title'), desc: t('home.step1Desc') },
  { icon: 'lucide:home', title: t('home.step2Title'), desc: t('home.step2Desc') },
  { icon: 'lucide:phone', title: t('home.step3Title'), desc: t('home.step3Desc') },
])

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

function selectRegion(code: string) {
  localSelectedCode.value = code
  region.setRegion(code)
  loadFeatured()
}

function switchRegionAndSearch(code: string) {
  region.setRegion(code)
  router.push('/listings')
}

onMounted(() => {
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
