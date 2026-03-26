import type { NatalChart } from '../../types/astrology'
import ZodiacRing from './ZodiacRing'
import HouseOverlay from './HouseOverlay'
import PlanetMarkers from './PlanetMarkers'
import AspectLines from './AspectLines'

interface Props {
  chart: NatalChart
}

export default function ChartWheel({ chart }: Props) {
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <svg viewBox="0 0 600 600" className="w-full h-auto">
        <circle cx={300} cy={300} r={290} fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth={0.5} />
        <circle cx={300} cy={300} r={220} fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth={0.5} />
        <circle cx={300} cy={300} r={80} fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth={0.5} />

        <ZodiacRing ascendant={chart.ascendant} />
        <HouseOverlay houses={chart.houses} ascendant={chart.ascendant} />
        <AspectLines aspects={chart.aspects} planets={chart.planets} ascendant={chart.ascendant} />
        <PlanetMarkers planets={chart.planets} ascendant={chart.ascendant} />

        <text x={300} y={296} textAnchor="middle" fontSize={10} fill="rgba(168,85,247,0.6)" style={{ userSelect: 'none' }}>
          ASC
        </text>
        <text x={300} y={308} textAnchor="middle" fontSize={8} fill="rgba(148,163,184,0.5)" style={{ userSelect: 'none' }}>
          {chart.ascendant.toFixed(1)}°
        </text>
      </svg>
    </div>
  )
}
