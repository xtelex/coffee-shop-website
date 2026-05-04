import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ShoeRow from '../components/ShoeRow'
import Hero3D from '../components/Hero3D'
import Jordan3D from '../components/Jordan3D'
import ImageShowcase from '../components/ImageShowcase'
import BestSellerSlider from '../components/BestSellerSlider'
import BrandSection from '../components/BrandSection'
import Footer from '../components/Footer'
import axios from 'axios'

export default function Home() {
  const [shoes, setShoes] = useState([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  
  // Parallax effect for hero
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    fetchShoes()
  }, [])

  const fetchShoes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/shoes`)
      setShoes(response.data)
    } catch (error) {
      console.error('Error fetching shoes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={containerRef} className="relative bg-white">
      {/* Hero Section with Parallax */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }}>
        <Hero3D />
      </motion.div>
      
      {/* Shoe Rows with Fade-in Animation */}
      <div className="relative z-10 -mt-32 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {loading ? (
            <div className="text-center py-20 text-black">Loading...</div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ShoeRow title="Trending Kicks" shoes={shoes.slice(0, 6)} />
              </motion.div>
              
              {/* Image Showcase Section */}
              <ImageShowcase />
              
              {/* Limited Edition - 3D Nike Air Jordan 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="py-8"
              >
                <h2 className="text-4xl font-bold mb-6 px-8 text-black">
                  Limited Edition
                </h2>
                <Jordan3D />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Best Seller Section */}
      <BestSellerSlider />

      {/* Brand Section */}
      <BrandSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
