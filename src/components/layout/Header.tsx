import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Moon, Stars } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  const navItems = [
    { path: '/astrology', label: '星盘命理', icon: Stars },
    { path: '/dream', label: '解梦', icon: Moon },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-gradient">星命</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
