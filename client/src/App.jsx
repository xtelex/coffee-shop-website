import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import ShoeDetail from './pages/ShoeDetail'
import Favorites from './pages/Favorites'
import SignIn from './pages/SignIn'
import StoreLocator from './pages/StoreLocator'
import Navbar from './components/Navbar'
import TopBanner from './components/TopBanner'
import SmoothScroll from './components/SmoothScroll'

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
          path="/shoe/:id" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ShoeDetail />
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
        <Route 
          path="/signin" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SignIn />
            </motion.div>
          } 
        />
        <Route 
          path="/store" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StoreLocator />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  )
}

function Layout() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/signin'
  
  return (
    <>
      {!hideNavbar && (
        <>
          <TopBanner />
          <Navbar />
        </>
      )}
      <AnimatedRoutes />
    </>
  )
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen bg-white text-black relative">
          <Layout />
        </div>
      </SmoothScroll>
    </Router>
  )
}

export default App
