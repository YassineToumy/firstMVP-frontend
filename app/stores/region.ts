// stores/region.ts
import { defineStore } from 'pinia'

export interface Region {
  code: string
  name: string
  currency: string
  locale: string
  count?: number
}

export const REGIONS: Region[] = [
  { code: 'FR', name: 'France', currency: 'EUR', locale: 'fr-FR' },
  { code: 'TN', name: 'Tunisia', currency: 'TND', locale: 'fr-TN' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', locale: 'en-EG' },
  { code: 'CA', name: 'Canada', currency: 'CAD', locale: 'en-CA' },
]

export const useRegionStore = defineStore('region', {
  state: () => ({
    currentCode: 'FR' as string,
  }),

  getters: {
    current(): Region {
      return REGIONS.find(r => r.code === this.currentCode) || REGIONS[0]
    },
    currency(): string {
      return this.current.currency
    },
  },

  actions: {
    setRegion(code: string) {
      const valid = REGIONS.find(r => r.code === code)
      if (valid) {
        this.currentCode = code
        if (import.meta.client) {
          localStorage.setItem('region', code)
        }
      }
    },
    init() {
      if (import.meta.client) {
        const saved = localStorage.getItem('region')
        if (saved && REGIONS.find(r => r.code === saved)) {
          this.currentCode = saved
        }
      }
    },
  },
})