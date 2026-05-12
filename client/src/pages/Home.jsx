import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import ShoeRow from '../components/ShoeRow'
import Hero3D from '../components/Hero3D'
import LimitedEdition from '../components/LimitedEdition'
import FindYourStyle from '../components/FindYourStyle'
import ProductShowcase from '../components/ProductShowcase'
import axios from 'axios'

// Lazy load heavy components
const ImageShowcase = lazy(() => import('../components/ImageShowcase'))
const BestSellerSlider = lazy(() => import('../components/BestSellerSlider'))
const Spotlight = lazy(() => import('../components/Spotlight'))
const BrandSection = lazy(() => import('../components/BrandSection'))
const Footer = lazy(() => import('../components/Footer'))

export default function Home() {
  const [shoes, setShoes] = useState([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

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
      {/* Hero Section */}
      <Hero3D />
      
      {/* Shoe Rows with Fade-in Animation */}
      <div className="relative z-10 -mt-32 bg-white">
        <div>
          {loading ? (
            <div className="text-center py-20 text-black">Loading...</div>
          ) : (
            <>
              <div>
                <ShoeRow title="Trending Kicks" shoes={shoes.slice(0, 6)} />
              </div>
              
              {/* Image Showcase Section - Lazy loaded */}
              <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
                <ImageShowcase />
              </Suspense>

              {/* Find Your Style Section */}
              <FindYourStyle />
              
              {/* Limited Edition - Static Image */}
              <div className="w-full">
                <LimitedEdition />
              </div>

              {/* Product Showcase Section */}
              <ProductShowcase />
            </>
          )}
        </div>
      </div>

      {/* Best Seller Section - Lazy loaded */}
      <Suspense fallback={<div className="h-screen bg-gray-100 animate-pulse" />}>
        <BestSellerSlider />
      </Suspense>

      {/* Spotlight Section - Lazy loaded */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <Spotlight />
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
