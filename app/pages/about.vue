<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <span class="inline-block text-xs font-semibold uppercase tracking-widest text-orange-100 mb-3">
            About RentGlobe
          </span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Connecting renters to the entire real estate market — without barriers
          </h1>
          <p class="mt-5 text-orange-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            RentGlobe bridges the gap between tenants and property owners, agencies, and real estate professionals
            across France, Tunisia, Egypt and Canada — all in one multilingual platform.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Our mission</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              One platform. All the market. No language barrier.
            </h2>
            <p class="mt-4 text-gray-500 leading-relaxed text-sm sm:text-base">
              Finding a rental property in a foreign country is hard. You face scattered listings across dozens of
              local platforms, language differences, unfamiliar legal systems, and a lack of transparency.
            </p>
            <p class="mt-3 text-gray-500 leading-relaxed text-sm sm:text-base">
              RentGlobe solves this by aggregating the best listings from the top real estate platforms in each country,
              translating them into <strong class="text-gray-900">4 languages</strong>, and presenting them in a
              single, easy-to-use interface. Whether you speak French, Arabic, English, or another language,
              you get the full picture.
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in stats" :key="stat.label" class="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6 text-center hover:border-orange-200 transition-all">
              <p class="text-3xl font-bold text-orange-500">{{ stat.value }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Who we connect -->
    <section class="bg-[#FAFAFA]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900">Who we connect</h2>
          <p class="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            RentGlobe acts as the bridge between all actors of the real estate rental market
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div v-for="actor in actors" :key="actor.title" class="bg-white border border-gray-100 rounded-2xl p-7 text-center hover:border-orange-200 hover:shadow-sm transition-all duration-300 group">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-100 group-hover:border-orange-300 transition-all">
              <Icon :name="actor.icon" class="w-7 h-7 text-orange-500" />
            </div>
            <h3 class="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{{ actor.title }}</h3>
            <p class="text-sm text-gray-500 mt-2 leading-relaxed">{{ actor.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Languages -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Language cards -->
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-5 flex items-center gap-3 hover:border-orange-200 hover:shadow-sm transition-all duration-200"
            >
              <img :src="`https://flagcdn.com/40x30/${lang.cc}.png`" :alt="lang.name" class="w-10 h-auto rounded" />
              <div>
                <p class="font-semibold text-gray-900 text-sm">{{ lang.name }}</p>
                <p class="text-xs text-gray-400">{{ lang.countries }}</p>
              </div>
            </div>
          </div>

          <div>
            <span class="inline-block text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Multilingual</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Listings translated into 4 languages
            </h2>
            <p class="mt-4 text-gray-500 leading-relaxed text-sm sm:text-base">
              One of the biggest obstacles for international renters is the language barrier.
              Listings in France are in French, those in Egypt in Arabic — making it hard to compare
              properties across borders.
            </p>
            <p class="mt-3 text-gray-500 leading-relaxed text-sm sm:text-base">
              Every listing on RentGlobe is automatically translated so that no matter where you're from
              or where you're searching, you always understand what you're reading — descriptions,
              amenities, legal conditions, and more.
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="lang in languages"
                :key="lang.code"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-medium rounded-full border border-orange-100"
              >
                <img :src="`https://flagcdn.com/20x15/${lang.cc}.png`" :alt="lang.name" class="w-4 rounded-sm" />
                {{ lang.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-[#FAFAFA]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900">Our values</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="value in values" :key="value.title" class="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 transition-all">
            <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
              <Icon :name="value.icon" class="w-5 h-5 text-orange-500" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-orange-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 class="text-2xl font-bold text-white">Start exploring today</h2>
        <p class="mt-2 text-orange-100 text-sm max-w-sm mx-auto">
          Browse thousands of verified rentals across 4 countries, in your language.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/listings"
            class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-50 transition-colors"
          >
            Browse listings
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors"
          >
            Contact us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '4', label: 'Countries covered' },
  { value: '4', label: 'Languages supported' },
  { value: '10k+', label: 'Active listings' },
  { value: '100%', label: 'Free for renters' },
]

const actors = [
  {
    icon: 'lucide:user',
    title: 'Individuals (Particuliers)',
    desc: 'Private landlords who list their property directly — no intermediary, direct contact with the tenant.',
  },
  {
    icon: 'lucide:building-2',
    title: 'Real estate agencies',
    desc: 'Professional agencies managing multiple properties across cities and countries, featured prominently on our platform.',
  },
  {
    icon: 'lucide:briefcase',
    title: 'Professionals & Pros',
    desc: 'Property managers, developers, and real estate professionals who want to reach a wider, international audience.',
  },
]

const languages = [
  { code: 'fr', cc: 'fr', name: 'French', countries: 'France, Tunisia' },
  { code: 'ar', cc: 'sa', name: 'Arabic', countries: 'Tunisia, Egypt' },
  { code: 'en', cc: 'gb', name: 'English', countries: 'Canada, Egypt' },
  { code: 'es', cc: 'es', name: 'Español', countries: 'Spain, Latin America' },
]

const values = [
  { icon: 'lucide:globe', title: 'Accessibility', desc: 'Everyone deserves access to a fair rental market, regardless of their language or location.' },
  { icon: 'lucide:search', title: 'Transparency', desc: 'We show real listings from verified sources with accurate information and no hidden fees.' },
  { icon: 'lucide:zap', title: 'Efficiency', desc: 'Find the right property faster by searching across all platforms at once, from one place.' },
  { icon: 'lucide:handshake', title: 'Connection', desc: 'We bring tenants, landlords, agencies and professionals together in a seamless experience.' },
]

useHead({ title: 'About Us — RentGlobe' })
</script>
