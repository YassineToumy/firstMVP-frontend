<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex flex-col md:flex-row gap-8">
      <LayoutAccountSidebar />

      <main class="flex-1 min-w-0">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p class="text-sm text-gray-500 mt-1">Personnalisez votre expérience RentGlobe.</p>
        </div>

        <div class="space-y-4 max-w-lg">
          <!-- Appearance -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Icon name="lucide:palette" class="w-4 h-4 text-gray-400" />
              Apparence
            </h2>

            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Mode sombre</p>
                <p class="text-xs text-gray-400 mt-0.5">Basculer vers un thème sombre</p>
              </div>
              <!-- Toggle switch -->
              <button
                @click="darkMode.toggle()"
                :class="darkMode.isDark.value ? 'bg-orange-500' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
              >
                <span
                  :class="darkMode.isDark.value ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                />
              </button>
            </div>
          </div>

          <!-- Language -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Icon name="lucide:globe" class="w-4 h-4 text-gray-400" />
              Langue
            </h2>

            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="selectedLang = lang.code"
                :class="selectedLang === lang.code
                  ? 'border-orange-400 bg-orange-50 text-orange-600'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'"
                class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all"
              >
                <img :src="`https://flagcdn.com/20x15/${lang.cc}.png`" :alt="lang.label" class="w-5 rounded-sm" />
                {{ lang.label }}
              </button>
            </div>
            <p class="text-xs text-gray-400 mt-3">Le changement de langue complet sera disponible prochainement.</p>
          </div>

          <!-- Notifications -->
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Icon name="lucide:bell" class="w-4 h-4 text-gray-400" />
              Notifications
            </h2>

            <div class="space-y-4">
              <div v-for="notif in notifications" :key="notif.key" class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ notif.label }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ notif.desc }}</p>
                </div>
                <button
                  @click="notif.value = !notif.value"
                  :class="notif.value ? 'bg-orange-500' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shrink-0"
                >
                  <span
                    :class="notif.value ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Danger zone -->
          <div class="bg-white rounded-2xl border border-red-100 p-6">
            <h2 class="text-sm font-semibold text-red-600 mb-4 flex items-center gap-2">
              <Icon name="lucide:alert-triangle" class="w-4 h-4" />
              Zone dangereuse
            </h2>
            <p class="text-sm text-gray-500 mb-4">La suppression de compte est définitive et irréversible.</p>
            <button class="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '~/composables/useDarkMode'

definePageMeta({ middleware: 'auth' })

const darkMode = useDarkMode()
const selectedLang = ref('fr')

const languages = [
  { code: 'fr', cc: 'fr', label: 'Français' },
  { code: 'en', cc: 'gb', label: 'English' },
  { code: 'ar', cc: 'sa', label: 'العربية' },
  { code: 'es', cc: 'es', label: 'Español' },
]

const notifications = reactive([
  { key: 'new_listings', label: 'Nouvelles annonces', desc: 'Soyez alerté des nouvelles annonces correspondant à vos critères.', value: true },
  { key: 'price_drops', label: 'Baisses de prix', desc: 'Recevez une notification quand le prix d\'une annonce baisse.', value: false },
  { key: 'newsletter', label: 'Newsletter', desc: 'Actualités et conseils de RentGlobe par email.', value: true },
])
</script>
