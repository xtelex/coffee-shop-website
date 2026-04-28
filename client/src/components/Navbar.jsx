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
        {/* Left side - Menu items */}
        <div className="flex gap-8 items-center text-black font-semibold">
          <Link to="/" className="hover:text-gray-600 transition uppercase tracking-wider text-sm">
            Menu
          </Link>
          <Link to="/merchandise" className="hover:text-gray-600 transition uppercase tracking-wider text-sm">
            Merchandise
          </Link>
          <Link to="/rewards" className="hover:text-gray-600 transition uppercase tracking-wider text-sm">
            Rewards
          </Link>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex gap-6 items-center">
          <Link to="/store" className="text-black hover:text-gray-600 transition text-sm font-semibold">
            Find a Store
          </Link>
          <Link to="/signin" className="text-black hover:text-gray-600 transition text-sm font-semibold px-4 py-2 border border-black rounded-full">
            Sign In
          </Link>
          <Link to="/join" className="text-white bg-black hover:bg-gray-800 transition text-sm font-semibold px-4 py-2 rounded-full">
            Join Now
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
