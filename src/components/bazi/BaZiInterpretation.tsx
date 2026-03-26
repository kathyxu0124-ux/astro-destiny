import type { BaZiChart, WuXing } from '../../types/bazi'
import { ELEMENT_NAMES, ELEMENT_COLORS } from '../../lib/bazi/elements'
import { DAY_MASTER_INTERPRETATIONS, ELEMENT_BALANCE_INTERPRETATIONS } from '../../lib/bazi/interpretations'

interface Props {
  chart: BaZiChart
}

const ORDER: WuXing[] = ['wood', 'fire', 'earth', 'metal', 'water']

export default function BaZiInterpretation({ chart }: Props) {
  const dayMasterInterp = DAY_MASTER_INTERPRETATIONS[chart.dayMaster]
  const total = Object.values(chart.elements).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-4">
      {dayMasterInterp && (
        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <span className="text-lg" style={{ color: ELEMENT_COLORS[chart.dayMasterElement] }}>{chart.dayMaster}</span>
            日主解读
          </h4>
          <p className="text-sm text-foreground-muted leading-relaxed">{dayMasterInterp}</p>
        </div>
      )}

      <div className="glass-card p-5">
        <h4 className="text-sm font-semibold mb-3">五行强弱分析</h4>
        <div className="space-y-3">
          {ORDER.map(el => {
            const count = chart.elements[el]
            const isStrong = count >= total / 5 + 1
            const interp = ELEMENT_BALANCE_INTERPRETATIONS[el]
            const text = isStrong ? interp.strong : interp.weak
            return (
              <div key={el} className="text-sm">
                <div className="flex items-center gap-2 mb-0.5">
                  <span style={{ color: ELEMENT_COLORS[el] }}>{ELEMENT_NAMES[el]}</span>
                  <span className="text-xs text-foreground-muted">({count}个)</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${isStrong ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}`}>
                    {isStrong ? '旺' : '弱'}
                  </span>
                </div>
                <p className="text-foreground-muted text-xs leading-relaxed">{text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
