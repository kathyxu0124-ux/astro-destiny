import { Send } from 'lucide-react'

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  loading?: boolean
}

export default function DreamInput({ value, onChange, onSubmit, loading }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-lg font-semibold mb-3">描述你的梦境</h3>
      <div className="relative">
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="详细描述你的梦境内容，越详细解读越准确...&#10;&#10;例如：昨晚梦见自己在一片森林里走路，突然看到一条大蛇盘在树上，然后天上下起了大雨..."
          className="input-cosmic min-h-[150px] resize-y pr-12"
          rows={5}
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim() || loading}
          className="absolute right-3 bottom-3 p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-foreground-muted mt-2">
        按 Enter 发送，Shift+Enter 换行
      </p>
    </div>
  )
}
