import { ZODIAC_SIGNS, ZODIAC_COLORS } from '../../lib/astrology/constants'

const CX = 300
const CY = 300
const OUTER_R = 280
const INNER_R = 220

interface Props {
  ascendant: number
}

export default function ZodiacRing({ ascendant }: Props) {
  const offset = -ascendant

  return (
    <g>
      {ZODIAC_SIGNS.map((sign, i) => {
        const startAngle = (i * 30 + offset) * Math.PI / 180
        const endAngle = ((i + 1) * 30 + offset) * Math.PI / 180
        const midAngle = ((i * 30 + 15) + offset) * Math.PI / 180

        const x1o = CX + OUTER_R * Math.cos(startAngle)
        const y1o = CY + OUTER_R * Math.sin(startAngle)
        const x2o = CX + OUTER_R * Math.cos(endAngle)
        const y2o = CY + OUTER_R * Math.sin(endAngle)
        const x1i = CX + INNER_R * Math.cos(startAngle)
        const y1i = CY + INNER_R * Math.sin(startAngle)
        const x2i = CX + INNER_R * Math.cos(endAngle)
        const y2i = CY + INNER_R * Math.sin(endAngle)

        const textR = (OUTER_R + INNER_R) / 2
        const tx = CX + textR * Math.cos(midAngle)
        const ty = CY + textR * Math.sin(midAngle)

        const path = [
          `M ${x1i} ${y1i}`,
          `L ${x1o} ${y1o}`,
          `A ${OUTER_R} ${OUTER_R} 0 0 1 ${x2o} ${y2o}`,
          `L ${x2i} ${y2i}`,
          `A ${INNER_R} ${INNER_R} 0 0 0 ${x1i} ${y1i}`,
          'Z',
        ].join(' ')

        return (
          <g key={sign.en}>
            <path
              d={path}
              fill={ZODIAC_COLORS[i]}
              fillOpacity={0.12}
              stroke={ZODIAC_COLORS[i]}
              strokeOpacity={0.3}
              strokeWidth={0.5}
            />
            <text
              x={tx}
              y={ty}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={20}
              fill={ZODIAC_COLORS[i]}
              style={{ userSelect: 'none' }}
            >
              {sign.symbol}
            </text>
          </g>
        )
      })}
    </g>
  )
}
