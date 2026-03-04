import { defineStore } from 'pinia'
import type { Listing } from '~/composables/useListings'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    listings: [] as Listing[],
  }),

  getters: {
    isFavorite: (state) => (source: string, sourceId: string) =>
      state.listings.some(l => l.source === source && l.source_id === sourceId),
    count: (state) => state.listings.length,
  },

  actions: {
    toggle(listing: Listing) {
      const idx = this.listings.findIndex(
        l => l.source === listing.source && l.source_id === listing.source_id,
      )
      if (idx === -1) {
        this.listings.push(listing)
      } else {
        this.listings.splice(idx, 1)
      }
      if (import.meta.client) {
        localStorage.setItem('favorites', JSON.stringify(this.listings))
      }
    },
    init() {
      if (import.meta.client) {
        const saved = localStorage.getItem('favorites')
        if (saved) {
          try { this.listings = JSON.parse(saved) } catch {}
        }
      }
    },
  },
})
