import type { House } from '../../types/astrology'

const CX = 300
const CY = 300
const INNER_R = 220
const CENTER_R = 80

interface Props {
  houses: House[]
  ascendant: number
}

export default function HouseOverlay({ houses, ascendant }: Props) {
  const offset = -ascendant

  return (
    <g>
      {houses.map((house) => {
        const angle = (house.longitude + offset) * Math.PI / 180
        const x1 = CX + CENTER_R * Math.cos(angle)
        const y1 = CY + CENTER_R * Math.sin(angle)
        const x2 = CX + INNER_R * Math.cos(angle)
        const y2 = CY + INNER_R * Math.sin(angle)

        const midAngle = (house.longitude + 15 + offset) * Math.PI / 180
        const textR = CENTER_R + 18
        const tx = CX + textR * Math.cos(midAngle)
        const ty = CY + textR * Math.sin(midAngle)

        return (
          <g key={house.number}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(168,85,247,0.25)"
              strokeWidth={house.number === 1 || house.number === 10 ? 1.5 : 0.5}
            />
            <text
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
              fill="rgba(168,85,247,0.5)"
              style={{ userSelect: 'none' }}
            >
              {house.number}
            </text>
          </g>
        )
      })}

      <line
        x1={CX - INNER_R} y1={CY}
        x2={CX - CENTER_R} y2={CY}
        stroke="#a855f7"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
        style={{ transform: `rotate(${offset}deg)`, transformOrigin: `${CX}px ${CY}px` }}
      />

      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#a855f7" />
        </marker>
      </defs>
    </g>
  )
}
