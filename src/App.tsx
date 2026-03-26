import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import StarBackground from './components/layout/StarBackground'
import HomePage from './pages/HomePage'
import AstrologyPage from './pages/AstrologyPage'
import DreamPage from './pages/DreamPage'

export default function App() {
  return (
    <BrowserRouter>
      <StarBackground />
      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/astrology" element={<AstrologyPage />} />
          <Route path="/dream" element={<DreamPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
