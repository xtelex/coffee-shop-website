import { motion } from 'framer-motion'

export default function TopBanner() {
  // Create multiple instances of the text for seamless loop
  const text = "ShoesKopo"
  const repeatedText = Array(20).fill(text).join(" • ")

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-black overflow-hidden py-2 z-[60]">
      {/* Continuously moving text */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
      >
        <span className="text-white text-lg font-bold tracking-wider">
          {repeatedText}
        </span>
        <span className="text-white text-lg font-bold tracking-wider ml-4">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  )
}
