import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CoffeeRow from '../components/CoffeeRow'
import Hero3D from '../components/Hero3D'
import Footer from '../components/Footer'
import axios from 'axios'
import img1 from '../image/img1.jpg'
import img2 from '../image/img2.jpg'
import img3 from '../image/img3.jpg'

export default function Home() {
  const [coffees, setCoffees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCoffees()
  }, [])

  const fetchCoffees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/coffees`)
      setCoffees(response.data)
    } catch (error) {
      console.error('Error fetching coffees:', error)
    } finally {
      setLoading(false)
    }
  }

  // Images for carousel
  const images = [img1, img2, img3]
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="relative">
      {/* Hero Section with 3D */}
      <Hero3D />
      
      {/* Coffee Rows */}
      <div className="relative z-10 -mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <>
              <CoffeeRow title="Popular Brews" coffees={coffees.slice(0, 6)} />
              <CoffeeRow title="Espresso Collection" coffees={coffees.slice(6, 12)} />
              <CoffeeRow title="Cold Brews" coffees={coffees.slice(12, 18)} />
            </>
          )}
        </motion.div>
      </div>

      {/* Image Carousel Section */}
      <div className="relative overflow-hidden bg-white">
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
              className="flex-shrink-0 w-[500px] h-[350px] overflow-hidden"
            >
              <img
                src={img}
                alt={`Coffee ${(index % images.length) + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Blur gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
