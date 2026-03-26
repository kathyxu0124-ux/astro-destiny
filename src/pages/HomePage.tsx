import { Link } from 'react-router-dom'
import { Stars, Moon, Sparkles, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Stars,
    title: '星盘解读',
    desc: '输入出生时间和地点，生成完整的西方占星星盘图，解读行星落座和相位关系',
    path: '/astrology',
    color: '#a855f7',
  },
  {
    icon: Sparkles,
    title: '生辰八字',
    desc: '根据出生日期推算四柱八字，分析五行强弱、日主特质，揭示命理密码',
    path: '/astrology',
    color: '#fbbf24',
  },
  {
    icon: Moon,
    title: '周公解梦',
    desc: '融合传统周公解梦与 AI 智能分析，从多维度为你解析梦境含义',
    path: '/dream',
    color: '#3b82f6',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <div className="text-center max-w-2xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            探索你的星命密码
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="text-gradient">星命</span>
            <span className="text-foreground"> - 命理解读</span>
          </h1>

          <p className="text-foreground-muted text-lg mb-8 leading-relaxed">
            融合西方占星术、中国传统命理与 AI 智能分析
            <br className="hidden sm:block" />
            为你揭示星辰与命运的奥秘
          </p>

          <Link to="/astrology" className="btn-primary text-lg px-8 py-3.5">
            开始探索
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Link
              key={f.title}
              to={f.path}
              className={`glass-card glass-card-hover p-6 opacity-0 animate-fade-in-up stagger-${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${f.color}15` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: f.color }}>
                进入
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
