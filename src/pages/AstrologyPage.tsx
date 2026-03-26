import { useState } from 'react'
import type { BirthData } from '../types/astrology'
import type { NatalChart } from '../types/astrology'
import type { BaZiChart } from '../types/bazi'
import { calculateNatalChart } from '../lib/astrology/calculations'
import { calculateBaZi } from '../lib/bazi/calculator'
import BirthDataForm from '../components/common/BirthDataForm'
import ChartWheel from '../components/astrology/ChartWheel'
import InterpretationPanel from '../components/astrology/InterpretationPanel'
import FourPillars from '../components/bazi/FourPillars'
import ElementsChart from '../components/bazi/ElementsChart'
import BaZiInterpretation from '../components/bazi/BaZiInterpretation'

type Tab = 'chart' | 'bazi'

export default function AstrologyPage() {
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)
  const [baziChart, setBaziChart] = useState<BaZiChart | null>(null)
  const [tab, setTab] = useState<Tab>('chart')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (data: BirthData) => {
    setLoading(true)
    setTimeout(() => {
      const natal = calculateNatalChart(data)
      const bazi = calculateBaZi(data.year, data.month, data.day, data.hour, data.minute)
      setNatalChart(natal)
      setBaziChart(bazi)
      setLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">星盘</span> & <span className="text-gradient-gold">八字</span>
          </h1>
          <p className="text-foreground-muted">输入出生信息，同时获得西方星盘和中国八字解读</p>
        </div>

        <div className="max-w-lg mx-auto mb-8">
          <BirthDataForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {(natalChart || baziChart) && (
          <div className="animate-fade-in-up">
            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setTab('chart')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === 'chart'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground-muted hover:bg-white/5 border border-transparent'
                }`}
              >
                西方星盘
              </button>
              <button
                onClick={() => setTab('bazi')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === 'bazi'
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-foreground-muted hover:bg-white/5 border border-transparent'
                }`}
              >
                生辰八字
              </button>
            </div>

            {tab === 'chart' && natalChart && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ChartWheel chart={natalChart} />
                </div>
                <div>
                  <InterpretationPanel chart={natalChart} />
                </div>
              </div>
            )}

            {tab === 'bazi' && baziChart && (
              <div className="max-w-2xl mx-auto space-y-6">
                <FourPillars chart={baziChart} />
                <ElementsChart elements={baziChart.elements} />
                <BaZiInterpretation chart={baziChart} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
