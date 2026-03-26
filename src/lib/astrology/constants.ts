export const ZODIAC_SIGNS = [
  { name: '白羊座', symbol: '\u2648', en: 'Aries', element: 'fire' },
  { name: '金牛座', symbol: '\u2649', en: 'Taurus', element: 'earth' },
  { name: '双子座', symbol: '\u264A', en: 'Gemini', element: 'air' },
  { name: '巨蟹座', symbol: '\u264B', en: 'Cancer', element: 'water' },
  { name: '狮子座', symbol: '\u264C', en: 'Leo', element: 'fire' },
  { name: '处女座', symbol: '\u264D', en: 'Virgo', element: 'earth' },
  { name: '天秤座', symbol: '\u264E', en: 'Libra', element: 'air' },
  { name: '天蝎座', symbol: '\u264F', en: 'Scorpio', element: 'water' },
  { name: '射手座', symbol: '\u2650', en: 'Sagittarius', element: 'fire' },
  { name: '摩羯座', symbol: '\u2651', en: 'Capricorn', element: 'earth' },
  { name: '水瓶座', symbol: '\u2652', en: 'Aquarius', element: 'air' },
  { name: '双鱼座', symbol: '\u2653', en: 'Pisces', element: 'water' },
] as const

export const PLANETS = [
  { name: '太阳', symbol: '\u2609', en: 'Sun' },
  { name: '月亮', symbol: '\u263D', en: 'Moon' },
  { name: '水星', symbol: '\u263F', en: 'Mercury' },
  { name: '金星', symbol: '\u2640', en: 'Venus' },
  { name: '火星', symbol: '\u2642', en: 'Mars' },
  { name: '木星', symbol: '\u2643', en: 'Jupiter' },
  { name: '土星', symbol: '\u2644', en: 'Saturn' },
  { name: '天王星', symbol: '\u2645', en: 'Uranus' },
  { name: '海王星', symbol: '\u2646', en: 'Neptune' },
  { name: '冥王星', symbol: '\u2647', en: 'Pluto' },
] as const

export const ASPECT_COLORS: Record<string, string> = {
  conjunction: '#4ade80',
  opposition: '#f87171',
  trine: '#60a5fa',
  square: '#f97316',
  sextile: '#a855f7',
}

export const ASPECT_NAMES: Record<string, string> = {
  conjunction: '合',
  opposition: '冲',
  trine: '三合',
  square: '刑',
  sextile: '六合',
}

export const ZODIAC_COLORS = [
  '#f87171', '#4ade80', '#fbbf24', '#60a5fa',
  '#f87171', '#4ade80', '#fbbf24', '#60a5fa',
  '#f87171', '#4ade80', '#fbbf24', '#60a5fa',
]
