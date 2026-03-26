import type { DreamMatch } from '../../types/dream'
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react'

interface Props {
  matches: DreamMatch[]
}

const SENTIMENT_CONFIG = {
  auspicious: { label: '吉', color: 'text-success', bg: 'bg-success/15', icon: ThumbsUp },
  inauspicious: { label: '凶', color: 'text-danger', bg: 'bg-danger/15', icon: ThumbsDown },
  neutral: { label: '中', color: 'text-accent', bg: 'bg-accent/15', icon: Minus },
}

export default function KeywordResults({ matches }: Props) {
  if (matches.length === 0) {
    return (
      <div className="glass-card p-6 text-center text-foreground-muted">
        <p>未匹配到梦境符号，试试描述更多细节，或使用 AI 深度解析</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground-muted">
        匹配到 {matches.length} 个梦境符号
      </h4>
      {matches.map((match, i) => {
        const config = SENTIMENT_CONFIG[match.symbol.sentiment]
        const Icon = config.icon
        return (
          <div key={i} className="glass-card glass-card-hover p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-foreground">{match.symbol.keyword}</span>
                  <span className="text-xs text-foreground-muted px-1.5 py-0.5 rounded bg-white/5">
                    {match.symbol.category}
                  </span>
                  {match.matchedWord !== match.symbol.keyword && (
                    <span className="text-xs text-foreground-muted">
                      (匹配: {match.matchedWord})
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {match.symbol.interpretation}
                </p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.color}`}>
                <Icon className="w-3 h-3" />
                {config.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
