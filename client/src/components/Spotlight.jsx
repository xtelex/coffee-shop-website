import { motion } from 'framer-motion'

export default function Spotlight() {
  const spotlightItems = [
    // Row 1
    { name: 'Air Jordan 1 Low', image: '/models/s1.jpg' },
    { name: 'Dunk', image: '/models/s2.jpg' },
    { name: 'Air Force 1', image: '/models/s3.jpg' },
    { name: 'Vomero Plus', image: '/models/s4.jpg' },
    { name: 'Pegasus Premium', image: '/models/s5.jpg' },
    { name: '24.7 Collection', image: '/models/s6.jpg' },
    { name: 'Tennis Apparel', image: '/models/s7.jpg' },
    { name: 'Vaporfly', image: '/models/s8.jpg' },
    // Row 2
    { name: 'Sabrina', image: '/models/s9.jpg' },
    { name: 'Cortez', image: '/models/s10.jpg' },
    { name: 'Metcon10', image: '/models/mdl1.jpg' },
    { name: 'NBA Jerseys', image: '/models/mdl2.jpg' },
    { name: 'Shox', image: '/models/mdl3.jpg' },
    { name: 'Air Max DN', image: '/models/mdl4.jpg' },
    { name: 'Zoomfly 6', image: '/models/mdl5.jpg' },
    { name: 'Graphic Tees', image: '/models/mdl6.jpg' }
  ]

  return (
    <div className="py-20 px-8 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-7xl font-black text-black uppercase tracking-tight mb-4">
          SPOTLIGHT
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Classic silhouettes and cutting-edge innovation to build your game from the ground up.
        </p>
      </motion.div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto">
        {/* Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-6">
          {spotlightItems.slice(0, 8).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-4 mb-3 hover:bg-gray-100 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Product Name */}
              <h3 className="text-center text-sm font-bold text-black">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {spotlightItems.slice(8, 16).map((item, index) => (
            <motion.div
              key={index + 8}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-4 mb-3 hover:bg-gray-100 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Product Name */}
              <h3 className="text-center text-sm font-bold text-black">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
