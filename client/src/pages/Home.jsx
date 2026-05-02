import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ShoeRow from '../components/ShoeRow'
import Hero3D from '../components/Hero3D'
import Footer from '../components/Footer'
import axios from 'axios'
import img1 from '../image/img1.jpg'
import img2 from '../image/img2.jpg'
import img3 from '../image/img3.jpg'

export default function Home() {
  const [shoes, setShoes] = useState([])
  const [loading, setLoading] = useState(true)

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

  // Images for carousel
  const images = [img1, img2, img3]
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="relative bg-black">
      {/* Hero Section with 3D */}
      <Hero3D />
      
      {/* Shoe Rows */}
      <div className="relative z-10 -mt-32 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? (
            <div className="text-center py-20 text-white">Loading...</div>
          ) : (
            <>
              <ShoeRow title="Trending Kicks" shoes={shoes.slice(0, 6)} />
              <ShoeRow title="Classic Collection" shoes={shoes.slice(6, 12)} />
              <ShoeRow title="Limited Edition" shoes={shoes.slice(12, 18)} />
            </>
          )}
        </motion.div>
      </div>

      {/* Image Carousel Section */}
      <div className="relative overflow-hidden bg-black border-t border-primary-red">
        <motion.div
          className="flex"
          animate={{
            x: [-33.33 * (images.length) + '%', 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[500px] h-[350px] overflow-hidden border-2 border-primary-red"
            >
              <img
                src={img}
                alt={`Shoe ${(index % images.length) + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Blur gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
