import type { PlanetPosition, NatalChart, BirthData } from '../../types/astrology'
import { ZODIAC_SIGNS, PLANETS } from './constants'
import { calculateAspects } from './aspects'
import { calculateHouses } from './houses'

const D2R = Math.PI / 180
const R2D = 180 / Math.PI

function julianDay(year: number, month: number, day: number, hour: number, minute: number): number {
  let y = year
  let m = month
  if (m <= 2) { y -= 1; m += 12 }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  const dayFrac = day + (hour + minute / 60) / 24
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFrac + B - 1524.5
}

function j2000Century(jd: number): number {
  return (jd - 2451545.0) / 36525
}

function normalize(angle: number): number {
  let a = angle % 360
  if (a < 0) a += 360
  return a
}

function horner(T: number, ...coeffs: number[]): number {
  let result = coeffs[coeffs.length - 1]
  for (let i = coeffs.length - 2; i >= 0; i--) {
    result = result * T + coeffs[i]
  }
  return result
}

function sunLongitude(T: number): number {
  const L0 = horner(T, 280.46646, 36000.76983, 0.0003032)
  const M = horner(T, 357.52911, 35999.05029, -0.0001537)
  const Mr = M * D2R
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mr)
    + 0.000289 * Math.sin(3 * Mr)
  const omega = 125.04 - 1934.136 * T
  const lon = L0 + C - 0.00569 - 0.00478 * Math.sin(omega * D2R)
  return normalize(lon)
}

function moonLongitude(T: number): number {
  const Lp = horner(T, 218.3164477, 481267.88123421, -0.0015786, 1 / 538841, -1 / 65194000)
  const D = horner(T, 297.8501921, 445267.1114034, -0.0018819, 1 / 545868, -1 / 113065000)
  const M = horner(T, 357.5291092, 35999.0502909, -0.0001536, 1 / 24490000)
  const Mp = horner(T, 134.9633964, 477198.8675055, 0.0087414, 1 / 69699, -1 / 14712000)
  const F = horner(T, 93.272095, 483202.0175233, -0.0036539, -1 / 3526000, 1 / 863310000)
  const A1 = 119.75 + 131.849 * T
  const A2 = 53.09 + 479264.29 * T

  const e = 1 - 0.002516 * T - 0.0000074 * T * T

  let Sl = 0
  const lr: [number, number, number, number, number][] = [
    [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314],
    [0, 0, 2, 0, 213618], [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332],
    [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066], [2, 0, 1, 0, 53322],
    [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
    [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528],
    [0, 0, 1, -2, 10980], [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034],
    [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888], [2, 1, 0, 0, -6766],
    [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
    [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665],
    [0, 1, -2, 0, -2689], [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390],
    [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236], [0, 1, 2, 0, -2120],
    [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048], [2, 0, 1, -2, -1773],
    [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110],
    [3, 0, -1, 0, -892], [2, 1, 1, 0, -810], [4, -1, -2, 0, 759],
    [0, 2, -1, 0, -713], [2, 2, -1, 0, -700], [2, 1, -2, 0, 691],
    [2, -1, 0, -2, 596], [4, 0, 1, 0, 549], [0, 0, 4, 0, 537],
    [4, -1, 0, 0, 520], [1, 0, -2, 0, -487],
  ]

  for (const [d, m, mp, f, coeff] of lr) {
    let term = coeff
    if (Math.abs(m) === 1) term *= e
    else if (Math.abs(m) === 2) term *= e * e
    term *= Math.sin((d * D + m * M + mp * Mp + f * F) * D2R)
    Sl += term
  }

  Sl += 3958 * Math.sin(A1 * D2R) + 1962 * Math.sin((Lp - F) * D2R) + 318 * Math.sin(A2 * D2R)

  return normalize(Lp + Sl / 1000000)
}

interface SimplePlanetTerms {
  L0: number; L1: number;
  perturbations: Array<{
    amp: number;
    arg: string;
    coeffs: number[];
  }>;
}

const PLANET_DATA: Record<string, SimplePlanetTerms> = {
  Mercury: { L0: 252.2509, L1: 149472.6746, perturbations: [] },
  Venus: { L0: 181.9798, L1: 58517.8157, perturbations: [] },
  Mars: { L0: 355.4330, L1: 19140.2993, perturbations: [] },
  Jupiter: { L0: 34.3515, L1: 3034.9057, perturbations: [] },
  Saturn: { L0: 50.0774, L1: 1222.1139, perturbations: [] },
  Uranus: { L0: 314.0550, L1: 428.4670, perturbations: [] },
  Neptune: { L0: 304.8803, L1: 218.4862, perturbations: [] },
  Pluto: { L0: 238.9286, L1: 145.2078, perturbations: [] },
}

function heliocentricLongitude(planet: string, T: number): number {
  const data = PLANET_DATA[planet]
  if (!data) return 0
  return normalize(data.L0 + data.L1 * T)
}

function geocentricLongitude(planet: string, T: number): number {
  if (planet === 'Sun') return sunLongitude(T)
  if (planet === 'Moon') return moonLongitude(T)

  const helioP = heliocentricLongitude(planet, T) * D2R
  const helioE = (horner(T, 100.4664, 36000.7698) * D2R)

  const Rp = getOrbitalRadius(planet)
  const Re = 1.0

  const x = Rp * Math.cos(helioP) - Re * Math.cos(helioE)
  const y = Rp * Math.sin(helioP) - Re * Math.sin(helioE)

  let lon = Math.atan2(y, x) * R2D
  return normalize(lon)
}

function getOrbitalRadius(planet: string): number {
  const radii: Record<string, number> = {
    Mercury: 0.387, Venus: 0.723, Mars: 1.524,
    Jupiter: 5.203, Saturn: 9.537, Uranus: 19.191,
    Neptune: 30.069, Pluto: 39.482,
  }
  return radii[planet] ?? 1
}

function getLongitudeForSign(longitude: number): { sign: string; signIndex: number; degree: number; minute: number } {
  const signIndex = Math.floor(longitude / 30)
  const remaining = longitude - signIndex * 30
  const degree = Math.floor(remaining)
  const minute = Math.floor((remaining - degree) * 60)
  return {
    sign: ZODIAC_SIGNS[signIndex].name,
    signIndex,
    degree,
    minute,
  }
}

function gmst(jd: number): number {
  const T = j2000Century(jd)
  const jd0 = Math.floor(jd + 0.5) - 0.5
  const H = (jd - jd0) * 24
  const T0 = (jd0 - 2451545.0) / 36525
  let theta = 6.697374558 + 2400.0513369 * T0 + 1.00273790935 * H + 0.000026 * T * T
  theta = ((theta % 24) + 24) % 24
  return theta
}

function calculateAscendant(jd: number, lat: number, lng: number): number {
  const theta = gmst(jd)
  const lst = theta + lng / 15
  const lstRad = (lst * 15) * D2R
  const latRad = lat * D2R
  const epsilon = 23.4393 * D2R

  const y = -Math.cos(lstRad)
  const x = Math.sin(epsilon) * Math.tan(latRad) + Math.cos(epsilon) * Math.sin(lstRad)
  let asc = Math.atan2(y, x) * R2D
  return normalize(asc)
}

export function calculateNatalChart(birthData: BirthData): NatalChart | null {
  if (!birthData.location) return null

  const { year, month, day, hour, minute, location } = birthData
  const jd = julianDay(year, month, day, hour, minute)
  const T = j2000Century(jd)

  const planets: PlanetPosition[] = PLANETS.map(p => {
    const lon = geocentricLongitude(p.en, T)
    const signInfo = getLongitudeForSign(lon)
    return {
      name: p.name,
      symbol: p.symbol,
      longitude: lon,
      ...signInfo,
    }
  })

  const ascendant = calculateAscendant(jd, location.lat, location.lng)
  const houses = calculateHouses(ascendant)
  const aspects = calculateAspects(planets)

  return { planets, houses, aspects, ascendant }
}
