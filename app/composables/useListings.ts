// composables/useListings.ts

import { useRegionStore } from "~/stores/region"
import { useApi } from "./useApi"

export interface Listing {
  source: string
  source_id: string
  country: string
  city: string
  district?: string
  property_type: string
  surface_m2?: number
  rooms?: number
  bedrooms?: number
  bathrooms?: number
  price: number
  currency: string
  is_furnished?: boolean
  latitude?: number
  longitude?: number
  description?: string
  thumbnail?: string
  photos_count?: number
  agent_or_agency?: string
  created_at: string
}

export interface ListingFilters {
  country?: string
  property_type?: string
  min_price?: number
  max_price?: number
  bedrooms?: number
  min_surface?: number
  max_surface?: number
  furnished?: boolean | null
  city?: string
  sort?: string
  page?: number
  per_page?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface ListingStats {
  total: number
  avg_price: number
  cities_count: number
  by_type: Record<string, number>
}

export function useListings() {
  const { apiFetch } = useApi()
  const region = useRegionStore()

  function buildQuery(filters: ListingFilters = {}): string {
    const params = new URLSearchParams()
    const merged = { country: region.currentCode, page: 1, per_page: 20, ...filters }

    for (const [key, val] of Object.entries(merged)) {
      if (val !== undefined && val !== null && val !== '') {
        params.set(key, String(val))
      }
    }
    return params.toString()
  }

  async function fetchListings(filters: ListingFilters = {}) {
    const qs = buildQuery(filters)
    return apiFetch<PaginatedResponse<Listing>>(`/listings?${qs}`)
  }

  async function fetchListing(source: string, id: string) {
    return apiFetch<{ data: Record<string, any> }>(`/listings/${source}/${id}`)
  }

  async function fetchStats() {
    return apiFetch<{ data: ListingStats }>(`/listings/stats?country=${region.currentCode}`)
  }

  async function fetchCities() {
    return apiFetch<{ data: { city: string; count: number }[] }>(`/cities?country=${region.currentCode}`)
  }

  async function fetchRegions() {
    return apiFetch<{ data: { code: string; name: string; currency: string; count: number }[] }>('/regions')
  }

  return { fetchListings, fetchListing, fetchStats, fetchCities, fetchRegions, buildQuery  }
}