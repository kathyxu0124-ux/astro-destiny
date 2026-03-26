import { useMemo } from 'react'

export default function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#12082a] to-[#0a0a1a]" />

      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          bottom: '20%',
          left: '-5%',
        }}
      />
    </div>
  )
}
