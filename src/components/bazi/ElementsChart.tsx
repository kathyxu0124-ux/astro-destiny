import type { WuXing } from '../../types/bazi'
import { ELEMENT_COLORS, ELEMENT_NAMES } from '../../lib/bazi/elements'

interface Props {
  elements: Record<WuXing, number>
}

const ORDER: WuXing[] = ['wood', 'fire', 'earth', 'metal', 'water']

export default function ElementsChart({ elements }: Props) {
  const max = Math.max(...Object.values(elements), 1)

  return (
    <div className="glass-card p-5">
      <h4 className="text-sm font-semibold text-foreground mb-4">五行分布</h4>
      <div className="space-y-3">
        {ORDER.map(el => {
          const count = elements[el]
          const pct = (count / max) * 100
          return (
            <div key={el} className="flex items-center gap-3">
              <span className="w-6 text-center text-lg" style={{ color: ELEMENT_COLORS[el] }}>
                {ELEMENT_NAMES[el]}
              </span>
              <div className="flex-1 h-6 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: ELEMENT_COLORS[el],
                    opacity: 0.7,
                  }}
                />
              </div>
              <span className="w-6 text-sm text-foreground-muted text-right">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
