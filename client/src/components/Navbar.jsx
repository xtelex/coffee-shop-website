import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Add search functionality here
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white shadow-sm"
    >
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-black">
            ShoesKopo
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right side - Actions */}
          <div className="flex gap-6 items-center">
            <Link to="/store" className="text-black hover:text-gray-600 transition text-sm font-semibold flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find a Store
            </Link>
            <Link to="/signin" className="text-black hover:text-gray-600 transition text-sm font-semibold flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign In / Join
            </Link>
            <Link to="/cart" className="text-black hover:text-gray-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center gap-8 py-3">
            <Link to="/mens" className="text-black hover:text-gray-600 transition font-semibold text-sm">
              Men's
            </Link>
            <Link to="/womens" className="text-black hover:text-gray-600 transition font-semibold text-sm">
              Women's
            </Link>
            <Link to="/kids" className="text-black hover:text-gray-600 transition font-semibold text-sm">
              Kids'
            </Link>
            <Link to="/new" className="text-black hover:text-gray-600 transition font-semibold text-sm">
              New
            </Link>
            <Link to="/brands" className="text-black hover:text-gray-600 transition font-semibold text-sm">
              Brands
            </Link>
            <Link to="/sale" className="text-black hover:text-gray-600 transition font-semibold text-sm">
              Sale
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
