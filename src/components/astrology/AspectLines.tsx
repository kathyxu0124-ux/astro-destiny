import type { Aspect, PlanetPosition } from '../../types/astrology'
import { ASPECT_COLORS } from '../../lib/astrology/constants'

const CX = 300
const CY = 300
const R = 140

interface Props {
  aspects: Aspect[]
  planets: PlanetPosition[]
  ascendant: number
}

export default function AspectLines({ aspects, planets, ascendant }: Props) {
  const offset = -ascendant
  const planetMap = new Map(planets.map(p => [p.name, p]))

  return (
    <g>
      {aspects.map((aspect, i) => {
        const p1 = planetMap.get(aspect.planet1)
        const p2 = planetMap.get(aspect.planet2)
        if (!p1 || !p2) return null

        const a1 = (p1.longitude + offset) * Math.PI / 180
        const a2 = (p2.longitude + offset) * Math.PI / 180

        const x1 = CX + R * Math.cos(a1)
        const y1 = CY + R * Math.sin(a1)
        const x2 = CX + R * Math.cos(a2)
        const y2 = CY + R * Math.sin(a2)

        const color = ASPECT_COLORS[aspect.type] ?? '#666'
        const isDashed = aspect.type === 'sextile' || aspect.type === 'trine'

        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth={aspect.orb < 2 ? 1.2 : 0.6}
            strokeOpacity={aspect.orb < 3 ? 0.6 : 0.3}
            strokeDasharray={isDashed ? '4 3' : undefined}
          />
        )
      })}
    </g>
  )
}
