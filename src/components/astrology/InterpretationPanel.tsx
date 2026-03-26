import type { NatalChart } from '../../types/astrology'
import { PLANET_INTERPRETATIONS, ASPECT_INTERPRETATIONS, HOUSE_INTERPRETATIONS } from '../../lib/astrology/interpretations'
import { ASPECT_NAMES, ASPECT_COLORS } from '../../lib/astrology/constants'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  chart: NatalChart
}

export default function InterpretationPanel({ chart }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>('planets')

  const toggle = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section)
  }

  return (
    <div className="space-y-3">
      {/* Planets Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggle('planets')}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold">行星落座解读</span>
          {expandedSection === 'planets' ? <ChevronUp className="w-4 h-4 text-foreground-muted" /> : <ChevronDown className="w-4 h-4 text-foreground-muted" />}
        </button>
        {expandedSection === 'planets' && (
          <div className="px-5 pb-4 space-y-3">
            {chart.planets.map(planet => {
              const interp = PLANET_INTERPRETATIONS[planet.name]?.[planet.sign]
              return (
                <div key={planet.name} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{planet.symbol}</span>
                    <span className="font-medium">{planet.name}</span>
                    <span className="text-primary text-sm">{planet.sign} {planet.degree}°{planet.minute}'</span>
                  </div>
                  {interp && <p className="text-sm text-foreground-muted leading-relaxed">{interp}</p>}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Aspects Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggle('aspects')}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold">相位关系 ({chart.aspects.length})</span>
          {expandedSection === 'aspects' ? <ChevronUp className="w-4 h-4 text-foreground-muted" /> : <ChevronDown className="w-4 h-4 text-foreground-muted" />}
        </button>
        {expandedSection === 'aspects' && (
          <div className="px-5 pb-4 space-y-2">
            {chart.aspects.map((aspect, i) => (
              <div key={i} className="flex items-center gap-2 text-sm py-1 border-t border-border first:border-t-0">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ASPECT_COLORS[aspect.type] }} />
                <span className="text-foreground">{aspect.planet1}</span>
                <span className="text-foreground-muted">{ASPECT_NAMES[aspect.type]}</span>
                <span className="text-foreground">{aspect.planet2}</span>
                <span className="text-foreground-muted text-xs ml-auto">容许度 {aspect.orb}°</span>
              </div>
            ))}
            {chart.aspects.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {Object.entries(ASPECT_INTERPRETATIONS).map(([type, text]) => {
                    const count = chart.aspects.filter(a => a.type === type).length
                    if (count === 0) return null
                    return <span key={type} className="block mb-1"><strong className="text-foreground">{ASPECT_NAMES[type]}({count})：</strong>{text}</span>
                  })}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Houses Section */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => toggle('houses')}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold">宫位含义</span>
          {expandedSection === 'houses' ? <ChevronUp className="w-4 h-4 text-foreground-muted" /> : <ChevronDown className="w-4 h-4 text-foreground-muted" />}
        </button>
        {expandedSection === 'houses' && (
          <div className="px-5 pb-4 space-y-1.5">
            {chart.houses.map(house => (
              <div key={house.number} className="text-sm text-foreground-muted py-1 border-t border-border first:border-t-0">
                <span className="text-foreground">{HOUSE_INTERPRETATIONS[house.number]}</span>
                <span className="ml-2 text-xs text-primary">({house.sign})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
