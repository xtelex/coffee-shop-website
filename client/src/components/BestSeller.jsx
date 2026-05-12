import { memo } from 'react'

const BestSeller = memo(function BestSeller({ onNext, onPrevious, showPrevious = false, currentSlide = 0, totalSlides = 1 }) {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20rem] font-black text-white/5 select-none leading-none">
          SHOES<br/>KO PO
        </h1>
      </div>

      {/* Blue Vignette Effect around the shoe */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[150px]"></div>
      </div>

      {/* Section Title */}
      <div className="absolute top-12 left-12 z-20">
        <h2 className="text-6xl font-bold text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Best Seller</h2>
        <div className="w-24 h-1 bg-blue-500"></div>
      </div>

      {/* Image Container - Full width, no spaces */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/models/best1.jpg"
          alt="Nike Air Jordan 1 Blue"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 left-12 z-20">
        <p className="text-white text-xl mb-4 max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Experience the exclusive Nike Air Jordan 1 in stunning blue. A perfect blend of style and performance.
        </p>
        <div className="flex gap-4">
          {showPrevious && (
            <button 
              onClick={onPrevious}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          )}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
            Shop Now
          </button>
          {onNext && (
            <button 
              onClick={onNext}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
})

export default BestSeller
