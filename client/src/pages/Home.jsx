import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CoffeeRow from '../components/CoffeeRow'
import Hero3D from '../components/Hero3D'
import Footer from '../components/Footer'
import axios from 'axios'

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

  return (
    <div className="relative">
      {/* Hero Section with 3D */}
      <Hero3D />
      
      {/* Coffee Rows */}
      <div className="relative z-10 -mt-32 pb-20">
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
