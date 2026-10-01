import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Loader from './components/Loader'
import { Approach, Hero, Insights, Services, Solutions, Statement } from './components/Sections'
import { ScrollProgress } from './components/ui'
import { initSmoothScroll, ScrollTrigger } from './lib/motion'

export default function App() {
  useEffect(() => {
    initSmoothScroll()
    // fonts change line lengths; re-measure scroll triggers once they're in
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Loader />
      <Header />
      <main id="main" className="relative z-10 rounded-b-[28px] bg-paper shadow-[0_40px_80px_-40px_rgba(6,20,27,0.35)]">
        <Hero />
        <Statement />
        <Services />
        <Approach />
        <Insights />
        <Solutions />
      </main>
      <Footer />
      <ScrollProgress />
    </>
  )
}
