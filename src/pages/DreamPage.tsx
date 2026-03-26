import { useState, useCallback } from 'react'
import { Settings, Sparkles, BookOpen, Key } from 'lucide-react'
import type { DreamMatch } from '../types/dream'
import { matchDreamKeywords } from '../lib/dream/keywordMatcher'
import { analyzeDreamWithAI } from '../lib/dream/aiAnalyzer'
import DreamInput from '../components/dream/DreamInput'
import KeywordResults from '../components/dream/KeywordResults'
import AIAnalysis from '../components/dream/AIAnalysis'

type Mode = 'keyword' | 'ai'

export default function DreamPage() {
  const [dreamText, setDreamText] = useState('')
  const [mode, setMode] = useState<Mode>('keyword')
  const [keywordMatches, setKeywordMatches] = useState<DreamMatch[]>([])
  const [aiText, setAiText] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') ?? '')
  const [hasResult, setHasResult] = useState(false)

  const handleSubmit = useCallback(() => {
    if (!dreamText.trim()) return

    if (mode === 'keyword') {
      const matches = matchDreamKeywords(dreamText)
      setKeywordMatches(matches)
      setHasResult(true)
    } else {
      if (!apiKey) {
        setShowApiKeyInput(true)
        return
      }
      setAiText('')
      setAiError('')
      setAiLoading(true)
      setHasResult(true)
      analyzeDreamWithAI(dreamText, apiKey, (chunk) => {
        setAiText(prev => prev + chunk)
      }).catch(err => {
        setAiError(err instanceof Error ? err.message : '分析失败，请检查 API Key 是否正确')
      }).finally(() => {
        setAiLoading(false)
      })
    }
  }, [dreamText, mode, apiKey])

  const handleSaveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey)
    setShowApiKeyInput(false)
    if (dreamText.trim()) {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">解梦</span>
          </h1>
          <p className="text-foreground-muted">融合周公解梦与 AI 分析，多维度解读梦境</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setMode('keyword')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'keyword'
                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                : 'text-foreground-muted hover:bg-white/5 border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            周公解梦
          </button>
          <button
            onClick={() => setMode('ai')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'ai'
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-foreground-muted hover:bg-white/5 border border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI 深度解析
          </button>
        </div>

        {/* API Key Config */}
        {mode === 'ai' && (
          <div className="mb-4">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              <Settings className="w-3 h-3" />
              {apiKey ? 'API Key 已配置' : '配置 OpenAI API Key'}
            </button>
            {showApiKeyInput && (
              <div className="mt-2 glass-card p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-foreground-muted">
                  <Key className="w-4 h-4" />
                  <span>输入你的 OpenAI API Key（仅存储在本地浏览器）</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="input-cosmic flex-1 text-sm"
                  />
                  <button onClick={handleSaveApiKey} className="btn-primary text-sm px-4 py-2">
                    保存
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <DreamInput
          value={dreamText}
          onChange={setDreamText}
          onSubmit={handleSubmit}
          loading={aiLoading}
        />

        {/* Results */}
        {hasResult && (
          <div className="mt-6 animate-fade-in-up">
            {mode === 'keyword' && <KeywordResults matches={keywordMatches} />}
            {mode === 'ai' && <AIAnalysis text={aiText} loading={aiLoading} error={aiError} />}
          </div>
        )}
      </div>
    </div>
  )
}
