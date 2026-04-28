import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 px-8 py-4"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-black text-3xl font-bold">
          On The Way Coffee
        </Link>
        
        <div className="flex gap-6 items-center text-black">
          <Link to="/" className="hover:text-gray-600 transition">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-gray-600 transition">
            My List
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
