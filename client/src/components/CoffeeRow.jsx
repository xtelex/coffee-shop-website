import { motion } from 'framer-motion'
import CoffeeCard from './CoffeeCard'

export default function CoffeeRow({ title, coffees }) {
  // Duplicate the coffees array for infinite scroll effect
  const duplicatedCoffees = [...coffees, ...coffees, ...coffees]

  return (
    <div className="mb-12">
      <h2 className="text-5xl font-bold mb-8 text-white pl-8 tracking-wide">{title}</h2>
      
      {/* Container with blur overlays */}
      <div className="relative">
        {/* Blur overlays on both ends - very thin */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, -1600], // Adjust based on card width
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
            {duplicatedCoffees.map((coffee, index) => (
              <div key={`${coffee._id || coffee.name}-${index}`} className="flex-shrink-0">
                <CoffeeCard coffee={coffee} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
