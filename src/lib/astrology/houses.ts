import type { House } from '../../types/astrology'
import { ZODIAC_SIGNS } from './constants'

export function calculateHouses(ascendant: number): House[] {
  const houses: House[] = []
  for (let i = 0; i < 12; i++) {
    const longitude = (ascendant + i * 30) % 360
    const signIndex = Math.floor(longitude / 30)
    houses.push({
      number: i + 1,
      longitude,
      sign: ZODIAC_SIGNS[signIndex].name,
    })
  }
  return houses
}
