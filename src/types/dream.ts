export interface DreamSymbol {
  keyword: string
  aliases: string[]
  interpretation: string
  sentiment: 'auspicious' | 'inauspicious' | 'neutral'
  category: string
}

export interface DreamMatch {
  symbol: DreamSymbol
  matchedWord: string
}
