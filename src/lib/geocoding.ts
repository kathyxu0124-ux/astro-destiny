import type { GeoLocation } from '../types/astrology'

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
}

export async function geocodePlace(query: string): Promise<GeoLocation[]> {
  if (!query.trim()) return []

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&accept-language=zh`

  const res = await fetch(url, {
    headers: { 'User-Agent': 'AstroDestinyApp/1.0' },
  })

  if (!res.ok) return []

  const data: NominatimResult[] = await res.json()
  return data.map(item => ({
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
    name: item.display_name,
  }))
}
