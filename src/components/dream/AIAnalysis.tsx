import { Loader2, Sparkles } from 'lucide-react'

interface Props {
  text: string
  loading: boolean
  error?: string
}

export default function AIAnalysis({ text, loading, error }: Props) {
  if (error) {
    return (
      <div className="glass-card p-5 border-danger/30">
        <p className="text-danger text-sm">{error}</p>
      </div>
    )
  }

  if (!text && !loading) return null

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold">AI 深度解析</h4>
        {loading && <Loader2 className="w-3 h-3 text-primary animate-spin ml-auto" />}
      </div>
      <div className="prose prose-sm prose-invert max-w-none">
        {text.split('\n').map((line, i) => {
          if (!line.trim()) return <br key={i} />
          if (line.startsWith('**') && line.endsWith('**')) {
            return <h5 key={i} className="text-foreground font-semibold mt-3 mb-1">{line.replace(/\*\*/g, '')}</h5>
          }
          if (line.startsWith('# ')) {
            return <h5 key={i} className="text-foreground font-semibold mt-3 mb-1">{line.slice(2)}</h5>
          }
          if (line.startsWith('## ')) {
            return <h5 key={i} className="text-foreground font-semibold mt-3 mb-1">{line.slice(3)}</h5>
          }
          return <p key={i} className="text-sm text-foreground-muted leading-relaxed mb-1">{line}</p>
        })}
        {loading && <span className="inline-block w-2 h-4 bg-primary/50 animate-pulse ml-0.5" />}
      </div>
    </div>
  )
}
