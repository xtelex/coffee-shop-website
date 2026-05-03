import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white text-black border-t border-gray-200"
    >
      {/* Quick Links Section */}
      <div className="bg-gray-50 py-8 w-full">
        <div className="w-full px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold">Contact Us</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-semibold">Order Status</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <span className="text-sm font-semibold">Shipping & Delivery</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm font-semibold">Store Finder</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span className="text-sm font-semibold">Returns & Refunds</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold">Help Center</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 w-full">
        <div className="w-full px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Legal Information */}
            <div>
              <h4 className="text-sm font-bold mb-4">Legal Information</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-black transition">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">Promotion Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">Privacy Statement</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">Accessibility Statement</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">Cookie Settings</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-black transition">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">The Heart of Sneakers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition flex items-center gap-1">
                  Careers
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition flex items-center gap-1">
                  Media Enquiries
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a></li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-sm font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-black transition flex items-center gap-1">
                  Store Locator
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">Gift Card Balance</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition">Click & Collect</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 w-full">
        <div className="w-full px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">ShoesKopo</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2026 ShoesKopo Sariaya Quezon Philippines. All Rights Reserved
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Prices subject to change without notice. Products shown may not be available in our stores.
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
