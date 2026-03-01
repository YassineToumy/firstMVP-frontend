/**
 * Converts a raw CDN image URL to a proxied URL through our Laravel API.
 * Bypasses hotlink protection on PropertyFinder, Mubawab, etc.
 *
 * Usage in templates:
 *   <img :src="proxyImage(listing.images[0])" />
 *
 * Usage in script:
 *   const { proxyImage } = useProxyImage()
 */
export function useProxyImage() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase // e.g. http://187.77.168.42:8000/api/v1

  /**
   * Domains that need proxying (hotlink protected)
   */
  const proxyDomains = [
    'static.shared.propertyfinder.com',
    'mubawab-media.com',
  ]

  function needsProxy(url: string): boolean {
    if (!url) return false
    return proxyDomains.some(domain => url.includes(domain))
  }

  function proxyImage(url: string | null | undefined): string {
    if (!url) return '/placeholder-property.jpg'

    // Only proxy domains that need it
    if (needsProxy(url)) {
      return `${apiBase}/image-proxy?url=${encodeURIComponent(url)}`
    }

    // Other images (bienici, mktlist) may work directly
    return url
  }

  return { proxyImage, needsProxy }
}