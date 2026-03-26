export interface Pillar {
  stem: string
  branch: string
  stemElement: WuXing
  branchElement: WuXing
}

export type WuXing = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

export interface BaZiChart {
  yearPillar: Pillar
  monthPillar: Pillar
  dayPillar: Pillar
  hourPillar: Pillar
  elements: Record<WuXing, number>
  dayMaster: string
  dayMasterElement: WuXing
}
