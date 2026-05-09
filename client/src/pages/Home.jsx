import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ShoeRow from '../components/ShoeRow'
import Hero3D from '../components/Hero3D'
import axios from 'axios'

// Lazy load heavy components
const Jordan3D = lazy(() => import('../components/Jordan3D'))
const ImageShowcase = lazy(() => import('../components/ImageShowcase'))
const BestSellerSlider = lazy(() => import('../components/BestSellerSlider'))
const SportsCategories = lazy(() => import('../components/SportsCategories'))
const BrandSection = lazy(() => import('../components/BrandSection'))
const Footer = lazy(() => import('../components/Footer'))

export default function Home() {
  const [shoes, setShoes] = useState([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  
  // Reduced parallax effect for better performance
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

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
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div className="text-center py-20 text-black">Loading...</div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <ShoeRow title="Trending Kicks" shoes={shoes.slice(0, 6)} />
              </motion.div>
              
              {/* Image Showcase Section - Lazy loaded */}
              <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <ImageShowcase />
              </Suspense>
              
              {/* Limited Edition - 3D Nike Air Jordan 1 - Lazy loaded */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="py-8"
              >
                <h2 className="text-4xl font-bold mb-6 px-8 text-black">
                  Limited Edition
                </h2>
                <Suspense fallback={<div className="h-[600px] bg-gray-100 animate-pulse" />}>
                  <Jordan3D />
                </Suspense>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Best Seller Section - Lazy loaded */}
      <Suspense fallback={<div className="h-screen bg-gray-100 animate-pulse" />}>
        <BestSellerSlider />
      </Suspense>

      {/* Sports Categories Section - Lazy loaded */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <SportsCategories />
      </Suspense>

      {/* Brand Section - Lazy loaded */}
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <BrandSection />
      </Suspense>

      {/* Footer - Lazy loaded */}
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
