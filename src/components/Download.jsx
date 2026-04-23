import { Download, Monitor, Shield, Zap } from 'lucide-react'

export default function DownloadSection() {
  return (
    <section id="download" className="py-24 relative overflow-hidden">
      {/* Big glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/12 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 section-grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Free Download — Windows
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Stop losing gigabytes.
          <br />
          <span className="gradient-text">Start cleaning today.</span>
        </h2>

        <p className="text-slate-500 text-lg max-w-lg mx-auto mb-10">
          Download Cypher Clean for free. No account, no subscription, no cloud. Just point it at a folder and watch the space come back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#"
            className="btn-primary flex items-center gap-3 text-base px-10 py-4 rounded-xl shadow-2xl shadow-blue-600/30"
          >
            <Download size={20} />
            Download for Windows — Free
          </a>
          <div className="text-slate-600 text-sm flex items-center gap-1.5">
            <Monitor size={14} />
            Windows 10 / 11 · 64-bit
          </div>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
          <span className="flex items-center gap-2"><Shield size={14} className="text-green-400" /> No cloud sync</span>
          <span className="flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> No account needed</span>
          <span className="flex items-center gap-2"><Download size={14} className="text-blue-400" /> ~12 MB installer</span>
          <span className="flex items-center gap-2"><Shield size={14} className="text-cyan-400" /> Safety-scored deletions</span>
        </div>
      </div>
    </section>
  )
}
