import type { Aspect, AspectType, PlanetPosition } from '../../types/astrology'

interface AspectDef {
  type: AspectType
  angle: number
  orb: number
}

const ASPECT_DEFS: AspectDef[] = [
  { type: 'conjunction', angle: 0, orb: 8 },
  { type: 'opposition', angle: 180, orb: 8 },
  { type: 'trine', angle: 120, orb: 8 },
  { type: 'square', angle: 90, orb: 7 },
  { type: 'sextile', angle: 60, orb: 6 },
]

export function calculateAspects(planets: PlanetPosition[]): Aspect[] {
  const aspects: Aspect[] = []

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      let diff = Math.abs(planets[i].longitude - planets[j].longitude)
      if (diff > 180) diff = 360 - diff

      for (const def of ASPECT_DEFS) {
        const orb = Math.abs(diff - def.angle)
        if (orb <= def.orb) {
          aspects.push({
            planet1: planets[i].name,
            planet2: planets[j].name,
            type: def.type,
            angle: def.angle,
            orb: Math.round(orb * 100) / 100,
          })
          break
        }
      }
    }
  }

  return aspects
}
