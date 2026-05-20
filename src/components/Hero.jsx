import { Download, ArrowRight } from 'lucide-react'
import cl1 from '../assets/CL1.png'
import { useDownloadModal } from '../context/DownloadModalContext'
import ScannerTicker from './ScannerTicker'

export default function Hero() {
  const { openModal } = useDownloadModal()
  return (
    <section className="relative md:min-h-screen flex flex-col items-center md:justify-center overflow-hidden noise-bg pt-28 sm:pt-36 pb-16">
      {/* Background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-indigo-600/6 rounded-full blur-3xl" />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 section-grid-bg pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Built for developers
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-5">
          Reclaim Your{' '}
          <span className="gradient-text">Disk Space.</span>
          <br />
          <span className="text-slate-300 font-light">Instantly.</span>
        </h1>

        {/* Sub */}
        <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
          Scan your PC for old dev projects, score every junk folder for safety, and delete gigabytes in one click.
        </p>

        {/* Scanner ticker - what we detect */}
        <ScannerTicker />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={openModal}
            className="btn-primary flex items-center justify-center gap-2.5 text-base px-8 py-4 rounded-xl shadow-xl shadow-blue-600/25"
          >
            <Download size={18} />
            Download for Windows
          </button>
          <a
            href="#preview"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group"
          >
            See it in action
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* App screenshot */}
        <div className="relative max-w-5xl mx-auto">
          {/* Outer glow frame */}
          <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-transparent rounded-2xl blur-xl" />
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-black/60 float-anim">
            <img
              src={cl1}
              alt="Cypher Clean - main dashboard showing 4.36 GB found across 62 folders"
              className="w-full block"
            />
          </div>
          {/* Fade-out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060d1a] to-transparent rounded-b-2xl pointer-events-none" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060d1a] to-transparent pointer-events-none" />
    </section>
  )
}
