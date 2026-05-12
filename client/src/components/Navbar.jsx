import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const megaMenuData = {
    mens: {
      featured: [
        { name: 'New Arrivals', link: '/mens/new-arrivals' },
        { name: 'Bestsellers', link: '/mens/bestsellers' },
        { name: 'Shop All Sale', link: '/mens/sale' },
        { name: 'All Conditions Gear', link: '/mens/all-conditions' }
      ],
      shoes: [
        { name: 'All Shoes', link: '/mens/shoes' },
        { name: 'Lifestyle', link: '/mens/shoes/lifestyle' },
        { name: 'Jordan', link: '/mens/shoes/jordan' },
        { name: 'Running', link: '/mens/shoes/running' },
        { name: 'Football', link: '/mens/shoes/football' },
        { name: 'Basketball', link: '/mens/shoes/basketball' },
        { name: 'Gym & Training', link: '/mens/shoes/gym' },
        { name: 'Tennis', link: '/mens/shoes/tennis' },
        { name: 'Skateboarding', link: '/mens/shoes/skateboarding' },
        { name: 'Sandals & Slides', link: '/mens/shoes/sandals' },
        { name: 'Nike By You', link: '/mens/shoes/nike-by-you' },
        { name: 'Trail Running', link: '/mens/shoes/trail-running' }
      ],
      clothing: [
        { name: 'All Clothing', link: '/mens/clothing' },
        { name: 'Tops & T-Shirts', link: '/mens/clothing/tops' },
        { name: 'Shorts', link: '/mens/clothing/shorts' },
        { name: 'Pants & Leggings', link: '/mens/clothing/pants' },
        { name: 'Hoodies & Sweatshirts', link: '/mens/clothing/hoodies' },
        { name: 'Jackets & Gilets', link: '/mens/clothing/jackets' },
        { name: 'Jerseys & Kits', link: '/mens/clothing/jerseys' },
        { name: 'Jordan', link: '/mens/clothing/jordan' },
        { name: 'All Conditions Gear', link: '/mens/clothing/all-conditions' }
      ],
      shopBySport: [
        { name: 'Running', link: '/mens/sport/running' },
        { name: 'Basketball', link: '/mens/sport/basketball' },
        { name: 'Football', link: '/mens/sport/football' },
        { name: 'Golf', link: '/mens/sport/golf' },
        { name: 'Tennis & Pickleball', link: '/mens/sport/tennis' },
        { name: 'Gym & Training', link: '/mens/sport/gym' },
        { name: 'Yoga', link: '/mens/sport/yoga' },
        { name: 'Skateboarding', link: '/mens/sport/skateboarding' },
        { name: 'Trail Running', link: '/mens/sport/trail-running' }
      ],
      accessories: [
        { name: 'All Accessories & Equipment', link: '/mens/accessories' },
        { name: 'Bags & Backpacks', link: '/mens/accessories/bags' },
        { name: 'Socks', link: '/mens/accessories/socks' },
        { name: 'Hats & Headwear', link: '/mens/accessories/hats' }
      ]
    },
    womens: {
      featured: [
        { name: 'New Arrivals', link: '/womens/new-arrivals' },
        { name: 'Bestsellers', link: '/womens/bestsellers' },
        { name: 'Shop All Sale', link: '/womens/sale' },
        { name: 'All Conditions Gear', link: '/womens/all-conditions' }
      ],
      shoes: [
        { name: 'All Shoes', link: '/womens/shoes' },
        { name: 'Lifestyle', link: '/womens/shoes/lifestyle' },
        { name: 'Jordan', link: '/womens/shoes/jordan' },
        { name: 'Running', link: '/womens/shoes/running' },
        { name: 'Gym & Training', link: '/womens/shoes/gym' },
        { name: 'Tennis', link: '/womens/shoes/tennis' },
        { name: 'Football', link: '/womens/shoes/football' },
        { name: 'Basketball', link: '/womens/shoes/basketball' },
        { name: 'Sandals & Slides', link: '/womens/shoes/sandals' },
        { name: 'Nike By You', link: '/womens/shoes/nike-by-you' },
        { name: 'Trail Running', link: '/womens/shoes/trail-running' }
      ],
      clothing: [
        { name: 'All Clothing', link: '/womens/clothing' },
        { name: 'Performance Essentials', link: '/womens/clothing/performance' },
        { name: 'Tops & T-Shirts', link: '/womens/clothing/tops' },
        { name: 'Sports Bras', link: '/womens/clothing/sports-bras' },
        { name: 'Pants & Leggings', link: '/womens/clothing/pants' },
        { name: 'Shorts', link: '/womens/clothing/shorts' },
        { name: 'Hoodies & Sweatshirts', link: '/womens/clothing/hoodies' },
        { name: 'Jackets & Gilets', link: '/womens/clothing/jackets' },
        { name: 'Skirts & Dresses', link: '/womens/clothing/skirts' },
        { name: 'Modest Wear', link: '/womens/clothing/modest' },
        { name: 'Nike Maternity', link: '/womens/clothing/maternity' },
        { name: 'Plus Size', link: '/womens/clothing/plus-size' },
        { name: 'All Conditions Gear', link: '/womens/clothing/all-conditions' }
      ],
      shopBySport: [
        { name: 'Yoga', link: '/womens/sport/yoga' },
        { name: 'Running', link: '/womens/sport/running' },
        { name: 'Gym & Training', link: '/womens/sport/gym' },
        { name: 'Basketball', link: '/womens/sport/basketball' },
        { name: 'Tennis & Pickleball', link: '/womens/sport/tennis' },
        { name: 'Golf', link: '/womens/sport/golf' },
        { name: 'Football', link: '/womens/sport/football' },
        { name: 'Skateboarding', link: '/womens/sport/skateboarding' },
        { name: 'Trail Running', link: '/womens/sport/trail-running' }
      ],
      accessories: [
        { name: 'All Accessories & Equipment', link: '/womens/accessories' },
        { name: 'Bags & Backpacks', link: '/womens/accessories/bags' },
        { name: 'Socks', link: '/womens/accessories/socks' },
        { name: 'Hats & Headwear', link: '/womens/accessories/hats' }
      ]
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Add search functionality here
  }

  const popularSearchTerms = [
    'pegasus 42',
    'summer staples',
    'kobe',
    'vomero',
    'basketball shoes',
    'vomero 5',
    'jordan',
    'bag'
  ]

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const handlePopularTermClick = (term) => {
    setSearchQuery(term)
    // Trigger search with the term
    console.log('Searching for:', term)
  }

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -200 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="fixed top-8 w-full z-50 bg-white shadow-sm"
    >
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo with Image and Text */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/models/logo.png" 
              alt="ShoesKopo Logo" 
              className="h-12 w-auto object-contain"
            />
            <span className="text-3xl font-bold text-black">ShoesKopo</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchClick}
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
            <div 
              className="relative"
              onMouseEnter={() => setHoveredMenu('mens')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link to="/mens" className="text-black hover:text-gray-600 transition font-semibold text-sm">
                Men's
              </Link>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setHoveredMenu('womens')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link to="/womens" className="text-black hover:text-gray-600 transition font-semibold text-sm">
                Women's
              </Link>
            </div>
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

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {hoveredMenu === 'mens' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white shadow-lg border-t border-gray-200"
            onMouseEnter={() => setHoveredMenu('mens')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              <div className="grid grid-cols-5 gap-8">
                {/* Featured Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Featured</h3>
                  <ul className="space-y-2">
                    {megaMenuData.mens.featured.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shoes Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Shoes</h3>
                  <ul className="space-y-2">
                    {megaMenuData.mens.shoes.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clothing Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Clothing</h3>
                  <ul className="space-y-2">
                    {megaMenuData.mens.clothing.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shop By Sport Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Shop By Sport</h3>
                  <ul className="space-y-2">
                    {megaMenuData.mens.shopBySport.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accessories & Equipment Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Accessories & Equipment</h3>
                  <ul className="space-y-2">
                    {megaMenuData.mens.accessories.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {hoveredMenu === 'womens' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white shadow-lg border-t border-gray-200"
            onMouseEnter={() => setHoveredMenu('womens')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              <div className="grid grid-cols-5 gap-8">
                {/* Featured Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Featured</h3>
                  <ul className="space-y-2">
                    {megaMenuData.womens.featured.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shoes Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Shoes</h3>
                  <ul className="space-y-2">
                    {megaMenuData.womens.shoes.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clothing Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Clothing</h3>
                  <ul className="space-y-2">
                    {megaMenuData.womens.clothing.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shop By Sport Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Shop By Sport</h3>
                  <ul className="space-y-2">
                    {megaMenuData.womens.shopBySport.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accessories & Equipment Column */}
                <div>
                  <h3 className="font-bold text-sm text-black mb-4">Accessories & Equipment</h3>
                  <ul className="space-y-2">
                    {megaMenuData.womens.accessories.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={item.link} 
                          className="text-sm text-gray-600 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-[70] pt-8"
            onClick={handleCloseSearch}
          >
            <div className="max-w-7xl mx-auto px-8 py-8 mt-8" onClick={(e) => e.stopPropagation()}>
              {/* Search Header */}
              <div className="flex items-center gap-4 mb-12">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3" onClick={handleCloseSearch}>
                  <img 
                    src="/models/logo.png" 
                    alt="ShoesKopo Logo" 
                    className="h-10 w-auto object-contain"
                  />
                </Link>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:bg-gray-200 transition text-lg"
                  />
                </div>

                {/* Cancel Button */}
                <button
                  onClick={handleCloseSearch}
                  className="text-black hover:text-gray-600 transition font-medium"
                >
                  Cancel
                </button>
              </div>

              {/* Popular Search Terms */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-4">Popular Search Terms</h3>
                <div className="flex flex-wrap gap-3">
                  {popularSearchTerms.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularTermClick(term)}
                      className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-black transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
