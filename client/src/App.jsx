import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CoffeeDetail from './pages/CoffeeDetail'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black relative">
        {/* Global Vignette Effect */}
        <div 
          className="fixed inset-0 pointer-events-none z-50" 
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
            mixBlendMode: 'multiply'
          }}
        />
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee/:id" element={<CoffeeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
