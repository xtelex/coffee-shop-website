import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis with recommended settings from official docs
    const lenis = new Lenis({
      duration: 1.2, // Default recommended duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
      orientation: 'vertical', // vertical, horizontal
      gestureOrientation: 'vertical', // vertical, horizontal, both
      smoothWheel: true, // Smooth the scroll initiated by wheel events
      wheelMultiplier: 1, // Multiplier for mouse wheel events
      touchMultiplier: 1, // Multiplier for touch events
      infinite: false, // Enable infinite scrolling
      autoResize: true, // Resize instance automatically based on ResizeObserver
      allowNestedScroll: true, // Automatically allow nested scrollable elements
    })

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
