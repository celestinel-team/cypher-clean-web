import { useEffect, useState } from 'react'
import { DownloadModalProvider } from './context/DownloadModalContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Preview from './components/Preview'
import AIAnalysis from './components/AIAnalysis'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Download from './components/Download'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Privacy from './components/Privacy'
import Terms from './components/Terms'

function getRoute() {
  const hash = window.location.hash || ''
  if (hash === '#/privacy') return 'privacy'
  if (hash === '#/terms') return 'terms'
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHashChange = () => {
      const next = getRoute()
      setRoute(next)
      if (next !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <DownloadModalProvider>
      <div className="min-h-screen bg-[#060d1a] text-slate-100 font-sans">
        <Navbar />
        {route === 'privacy' ? (
          <Privacy />
        ) : route === 'terms' ? (
          <Terms />
        ) : (
          <>
            <Hero />
            <Stats />
            <HowItWorks />
            <Preview />
            <AIAnalysis />
            <Features />
            <Pricing />
            <Testimonials />
            <Download />
            <FAQ />
            <Contact />
          </>
        )}
        <Footer />
      </div>
    </DownloadModalProvider>
  )
}
