import type { DreamMatch } from '../../types/dream'
import { DREAM_DICTIONARY } from './dictionary'

export function matchDreamKeywords(text: string): DreamMatch[] {
  const matches: DreamMatch[] = []
  const matched = new Set<string>()

  for (const symbol of DREAM_DICTIONARY) {
    const allKeywords = [symbol.keyword, ...symbol.aliases]
    for (const kw of allKeywords) {
      if (text.includes(kw) && !matched.has(symbol.keyword)) {
        matches.push({ symbol, matchedWord: kw })
        matched.add(symbol.keyword)
        break
      }
    }
  }

  return matches
}
