import { motion } from 'framer-motion'

export default function FindYourStyle() {
  const shoeCategories = [
    { name: 'Classic', image: '/models/mdl1.jpg' },
    { name: 'Sport', image: '/models/mdl2.jpg' },
    { name: 'Casual', image: '/models/mdl3.jpg' },
    { name: 'Running', image: '/models/mdl4.jpg' },
    { name: 'Street', image: '/models/mdl5.jpg' },
    { name: 'Premium', image: '/models/mdl6.jpg' }
  ]

  return (
    <div className="py-16 px-8 bg-white">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-black text-black mb-12 uppercase tracking-tight"
      >
        Find Your Style
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {shoeCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4]"
          >
            {/* Shoe Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Category Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-bold uppercase tracking-wide">
                {category.name}
              </h3>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
