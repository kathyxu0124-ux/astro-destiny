import type { WuXing } from '../../types/bazi'

export const ELEMENT_NAMES: Record<WuXing, string> = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
}

export const ELEMENT_COLORS: Record<WuXing, string> = {
  wood: '#4ade80',
  fire: '#f87171',
  earth: '#fbbf24',
  metal: '#e2e8f0',
  water: '#60a5fa',
}

export const STEM_NAMES: Record<string, { element: string; yinYang: string }> = {
  '甲': { element: '木', yinYang: '阳' },
  '乙': { element: '木', yinYang: '阴' },
  '丙': { element: '火', yinYang: '阳' },
  '丁': { element: '火', yinYang: '阴' },
  '戊': { element: '土', yinYang: '阳' },
  '己': { element: '土', yinYang: '阴' },
  '庚': { element: '金', yinYang: '阳' },
  '辛': { element: '金', yinYang: '阴' },
  '壬': { element: '水', yinYang: '阳' },
  '癸': { element: '水', yinYang: '阴' },
}

export const BRANCH_NAMES: Record<string, { animal: string; element: string }> = {
  '子': { animal: '鼠', element: '水' },
  '丑': { animal: '牛', element: '土' },
  '寅': { animal: '虎', element: '木' },
  '卯': { animal: '兔', element: '木' },
  '辰': { animal: '龙', element: '土' },
  '巳': { animal: '蛇', element: '火' },
  '午': { animal: '马', element: '火' },
  '未': { animal: '羊', element: '土' },
  '申': { animal: '猴', element: '金' },
  '酉': { animal: '鸡', element: '金' },
  '戌': { animal: '狗', element: '土' },
  '亥': { animal: '猪', element: '水' },
}
