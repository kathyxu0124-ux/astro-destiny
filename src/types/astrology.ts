export interface PlanetPosition {
  name: string
  symbol: string
  longitude: number
  sign: string
  signIndex: number
  degree: number
  minute: number
}

export interface House {
  number: number
  longitude: number
  sign: string
}

export interface Aspect {
  planet1: string
  planet2: string
  type: AspectType
  angle: number
  orb: number
}

export type AspectType = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'

export interface NatalChart {
  planets: PlanetPosition[]
  houses: House[]
  aspects: Aspect[]
  ascendant: number
}

export interface GeoLocation {
  lat: number
  lng: number
  name: string
}

export interface BirthData {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  location: GeoLocation | null
}
