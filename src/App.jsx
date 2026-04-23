import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Preview from './components/Preview'
import Pricing from './components/Pricing'
import Download from './components/Download'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#060d1a] text-slate-100 font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Preview />
      <Pricing />
      <Download />
      <FAQ />
      <Footer />
    </div>
  )
}
