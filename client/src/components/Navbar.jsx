import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-black px-8 py-4"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Menu items */}
        <div className="flex gap-8 items-center text-white font-semibold">
          <Link to="/" className="hover:text-primary-red transition uppercase tracking-wider text-sm">
            Menu
          </Link>
          <Link to="/merchandise" className="hover:text-primary-red transition uppercase tracking-wider text-sm">
            Merchandise
          </Link>
          <Link to="/rewards" className="hover:text-primary-red transition uppercase tracking-wider text-sm">
            Rewards
          </Link>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex gap-6 items-center">
          <Link to="/store" className="text-white hover:text-primary-red transition text-sm font-semibold">
            Find a Store
          </Link>
          <Link to="/signin" className="text-white hover:text-primary-red transition text-sm font-semibold px-4 py-2 border border-primary-red rounded-full">
            Sign In
          </Link>
          <Link to="/join" className="text-white bg-primary-red hover:bg-primary-dark-red transition text-sm font-semibold px-4 py-2 rounded-full">
            Join Now
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
