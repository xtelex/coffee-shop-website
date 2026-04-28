import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import CoffeeDetail from './pages/CoffeeDetail'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/coffee/:id" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CoffeeDetail />
            </motion.div>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Favorites />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  )
}

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
        <AnimatedRoutes />
      </div>
    </Router>
  )
}

export default App
