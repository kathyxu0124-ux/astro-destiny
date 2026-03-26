import { useState, useCallback, useEffect, useRef } from 'react'
import { MapPin, Search } from 'lucide-react'
import type { BirthData, GeoLocation } from '../../types/astrology'
import { geocodePlace } from '../../lib/geocoding'

interface Props {
  onSubmit: (data: BirthData) => void
  loading?: boolean
}

export default function BirthDataForm({ onSubmit, loading }: Props) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('12:00')
  const [placeQuery, setPlaceQuery] = useState('')
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([])
  const [selectedPlace, setSelectedPlace] = useState<GeoLocation | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handlePlaceSearch = useCallback((query: string) => {
    setPlaceQuery(query)
    setSelectedPlace(null)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (query.length < 2) {
      setSuggestions([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      const results = await geocodePlace(query)
      setSuggestions(results)
      setShowSuggestions(true)
    }, 500)
  }, [])

  const handleSelectPlace = useCallback((place: GeoLocation) => {
    setSelectedPlace(place)
    setPlaceQuery(place.name.split(',')[0])
    setShowSuggestions(false)
    setSuggestions([])
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !selectedPlace) return

    const [y, m, d] = date.split('-').map(Number)
    const [h, min] = time.split(':').map(Number)

    onSubmit({
      year: y,
      month: m,
      day: d,
      hour: h,
      minute: min,
      location: selectedPlace,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
      <h3 className="text-lg font-semibold text-foreground">输入出生信息</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground-muted mb-1.5">出生日期</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="input-cosmic"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-foreground-muted mb-1.5">出生时间</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="input-cosmic"
            required
          />
        </div>
      </div>

      <div ref={wrapperRef} className="relative">
        <label className="block text-sm text-foreground-muted mb-1.5">出生地点</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            value={placeQuery}
            onChange={e => handlePlaceSearch(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="输入城市名称，如：北京、上海..."
            className="input-cosmic pl-10"
          />
          {!selectedPlace && placeQuery.length >= 2 && (
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted animate-pulse" />
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-1 glass-card overflow-hidden max-h-48 overflow-y-auto">
            {suggestions.map((place, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectPlace(place)}
                className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 transition-colors border-b border-border last:border-b-0"
              >
                <div className="truncate">{place.name}</div>
                <div className="text-xs text-foreground-muted mt-0.5">
                  {place.lat.toFixed(2)}°N, {place.lng.toFixed(2)}°E
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedPlace && (
          <div className="mt-2 text-xs text-primary flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {selectedPlace.lat.toFixed(4)}°N, {selectedPlace.lng.toFixed(4)}°E
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!date || !selectedPlace || loading}
        className="btn-primary w-full justify-center"
      >
        {loading ? '计算中...' : '开始解读'}
      </button>
    </form>
  )
}
