import { motion } from 'framer-motion'

export default function Favorites() {
  return (
    <div className="pt-32 px-8 max-w-7xl mx-auto bg-black min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-primary-red"
      >
        My Collection
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400"
      >
        Your favorite kicks will appear here.
      </motion.div>
    </div>
  )
}
