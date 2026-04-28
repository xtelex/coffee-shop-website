import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-black text-white border-t border-gray-800 py-12 mt-20"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Catchy Slogan */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-2">
            On The Way Coffee
          </h3>
          <p className="text-xl text-gray-300 italic">
            "Brewing Dreams, One Cup at a Time ☕"
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Your journey to the perfect cup starts here
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mt-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-gray-400 text-sm">
              Bringing you the finest coffee experiences from around the world, 
              visualized in stunning 3D.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/favorites" className="hover:text-white transition">My List</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <p className="text-gray-400 text-sm mb-4">
              Follow us on social media for the latest brews and updates
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="text-2xl">🐦</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            © 2026 On The Way Coffee. All rights reserved. | Crafted with ❤️ and ☕
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
