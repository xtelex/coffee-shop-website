import { motion } from 'framer-motion'

export default function BrandSection() {
  const brandsRow1 = [
    { name: 'Nike', logo: 'https://cdn.worldvectorlogo.com/logos/nike-4.svg' },
    { name: 'New Balance', logo: 'https://cdn.worldvectorlogo.com/logos/new-balance-2.svg' },
    { name: 'ASICS', logo: 'https://cdn.worldvectorlogo.com/logos/asics-1.svg' },
    { name: 'Converse', logo: 'https://cdn.worldvectorlogo.com/logos/converse-logo-1.svg' },
    { name: 'Puma', logo: 'https://cdn.worldvectorlogo.com/logos/puma-1.svg' },
  ]

  const brandsRow2 = [
    { name: 'Adidas', logo: 'https://cdn.worldvectorlogo.com/logos/adidas-9.svg' },
    { name: 'Jordan', logo: 'https://cdn.worldvectorlogo.com/logos/air-jordan-1.svg' },
    { name: 'Crocs', logo: 'https://cdn.worldvectorlogo.com/logos/crocs.svg' },
    { name: 'Under Armour', logo: 'https://cdn.worldvectorlogo.com/logos/under-armour-1.svg' },
    { name: 'Salomon', logo: 'https://cdn.worldvectorlogo.com/logos/salomon-1.svg' }
  ]

  // Duplicate brands for seamless loop
  const duplicatedRow1 = [...brandsRow1, ...brandsRow1, ...brandsRow1]
  const duplicatedRow2 = [...brandsRow2, ...brandsRow2, ...brandsRow2]

  return (
    <div className="py-16 bg-white w-full overflow-hidden">
      <div className="w-full px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-black"
          >
            Shop Brands
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#"
            className="text-black hover:text-gray-600 transition font-semibold underline"
          >
            Explore all brands
          </motion.a>
        </div>

        {/* First Row - Moving Right */}
        <div className="relative mb-4">
          {/* Blur overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [-1600, 0], // Moving right (negative to positive)
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedRow1.map((brand, index) => (
                <a
                  key={`row1-${index}`}
                  href="#"
                  className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center hover:shadow-lg hover:border-gray-300 transition-all group h-32"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-w-full max-h-16 object-contain group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<span class="font-bold text-2xl text-black">${brand.name}</span>`
                    }}
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Second Row - Moving Left */}
        <div className="relative">
          {/* Blur overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -1600], // Moving left (positive to negative)
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedRow2.map((brand, index) => (
                <a
                  key={`row2-${index}`}
                  href="#"
                  className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center hover:shadow-lg hover:border-gray-300 transition-all group h-32"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-w-full max-h-16 object-contain group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<span class="font-bold text-2xl text-black">${brand.name}</span>`
                    }}
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
