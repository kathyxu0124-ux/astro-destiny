import { Solar } from 'lunar-typescript'
import type { BaZiChart, Pillar, WuXing } from '../../types/bazi'

const STEM_ELEMENTS: Record<string, WuXing> = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
}

const BRANCH_ELEMENTS: Record<string, WuXing> = {
  '子': 'water', '丑': 'earth',
  '寅': 'wood', '卯': 'wood',
  '辰': 'earth', '巳': 'fire',
  '午': 'fire', '未': 'earth',
  '申': 'metal', '酉': 'metal',
  '戌': 'earth', '亥': 'water',
}

function parsePillar(ganZhi: string): Pillar {
  const stem = ganZhi[0]
  const branch = ganZhi[1]
  return {
    stem,
    branch,
    stemElement: STEM_ELEMENTS[stem] ?? 'earth',
    branchElement: BRANCH_ELEMENTS[branch] ?? 'earth',
  }
}

function countElements(pillars: Pillar[]): Record<WuXing, number> {
  const counts: Record<WuXing, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  for (const p of pillars) {
    counts[p.stemElement]++
    counts[p.branchElement]++
  }
  return counts
}

export function calculateBaZi(year: number, month: number, day: number, hour: number, minute: number): BaZiChart | null {
  try {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0)
    const lunar = solar.getLunar()
    const eightChar = lunar.getEightChar()

    const yearPillar = parsePillar(eightChar.getYear())
    const monthPillar = parsePillar(eightChar.getMonth())
    const dayPillar = parsePillar(eightChar.getDay())
    const hourPillar = parsePillar(eightChar.getTime())

    const elements = countElements([yearPillar, monthPillar, dayPillar, hourPillar])
    const dayMaster = dayPillar.stem

    return {
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      elements,
      dayMaster,
      dayMasterElement: STEM_ELEMENTS[dayMaster] ?? 'earth',
    }
  } catch {
    return null
  }
}
