import type { BaZiChart } from '../../types/bazi'
import { ELEMENT_COLORS, ELEMENT_NAMES } from '../../lib/bazi/elements'

interface Props {
  chart: BaZiChart
}

const PILLAR_LABELS = ['时柱', '日柱', '月柱', '年柱']

export default function FourPillars({ chart }: Props) {
  const pillars = [chart.hourPillar, chart.dayPillar, chart.monthPillar, chart.yearPillar]

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3 sm:gap-5">
        {pillars.map((pillar, i) => (
          <div key={i} className="glass-card p-3 sm:p-4 min-w-[72px] text-center">
            <div className="text-xs text-foreground-muted mb-2">{PILLAR_LABELS[i]}</div>

            <div
              className="text-2xl sm:text-3xl font-bold mb-1"
              style={{ color: ELEMENT_COLORS[pillar.stemElement] }}
            >
              {pillar.stem}
            </div>
            <div className="text-[10px] mb-2" style={{ color: ELEMENT_COLORS[pillar.stemElement], opacity: 0.7 }}>
              {ELEMENT_NAMES[pillar.stemElement]}
            </div>

            <div className="w-full h-px bg-border my-2" />

            <div
              className="text-2xl sm:text-3xl font-bold mb-1"
              style={{ color: ELEMENT_COLORS[pillar.branchElement] }}
            >
              {pillar.branch}
            </div>
            <div className="text-[10px]" style={{ color: ELEMENT_COLORS[pillar.branchElement], opacity: 0.7 }}>
              {ELEMENT_NAMES[pillar.branchElement]}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-foreground-muted">
        日主：<span className="text-foreground font-semibold" style={{ color: ELEMENT_COLORS[chart.dayMasterElement] }}>
          {chart.dayMaster} ({ELEMENT_NAMES[chart.dayMasterElement]})
        </span>
      </div>
    </div>
  )
}
