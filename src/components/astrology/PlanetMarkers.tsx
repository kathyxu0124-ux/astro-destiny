import type { PlanetPosition } from '../../types/astrology'

const CX = 300
const CY = 300
const PLANET_R = 180

interface Props {
  planets: PlanetPosition[]
  ascendant: number
}

function adjustPlanetPositions(planets: PlanetPosition[], offset: number): Array<PlanetPosition & { displayAngle: number }> {
  const sorted = planets.map(p => ({
    ...p,
    displayAngle: (p.longitude + offset),
  }))

  sorted.sort((a, b) => a.displayAngle - b.displayAngle)

  const minGap = 12
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < sorted.length; i++) {
      const next = sorted[(i + 1) % sorted.length]
      let gap = next.displayAngle - sorted[i].displayAngle
      if (i === sorted.length - 1) gap += 360
      if (gap < minGap) {
        const shift = (minGap - gap) / 2
        sorted[i].displayAngle -= shift
        next.displayAngle += shift
      }
    }
  }

  return sorted
}

export default function PlanetMarkers({ planets, ascendant }: Props) {
  const offset = -ascendant
  const adjusted = adjustPlanetPositions(planets, offset)

  return (
    <g>
      {adjusted.map((planet) => {
        const angle = planet.displayAngle * Math.PI / 180
        const px = CX + PLANET_R * Math.cos(angle)
        const py = CY + PLANET_R * Math.sin(angle)

        const dotR = PLANET_R + 25
        const dx = CX + dotR * Math.cos(planet.displayAngle * Math.PI / 180)
        const dy = CY + dotR * Math.sin(planet.displayAngle * Math.PI / 180)

        return (
          <g key={planet.name}>
            <line
              x1={dx} y1={dy}
              x2={px} y2={py}
              stroke="rgba(168,85,247,0.15)"
              strokeWidth={0.5}
            />
            <circle cx={dx} cy={dy} r={2} fill="rgba(168,85,247,0.3)" />

            <circle cx={px} cy={py} r={16} fill="rgba(10,10,26,0.8)" stroke="rgba(168,85,247,0.3)" strokeWidth={0.5} />
            <text
              x={px} y={py}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
              fill="#e2e8f0"
              style={{ userSelect: 'none' }}
            >
              {planet.symbol}
            </text>

            <text
              x={px} y={py + 22}
              textAnchor="middle"
              fontSize={7}
              fill="rgba(148,163,184,0.8)"
              style={{ userSelect: 'none' }}
            >
              {planet.sign} {planet.degree}°{planet.minute}'
            </text>
          </g>
        )
      })}
    </g>
  )
}
