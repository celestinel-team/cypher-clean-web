import { Download, Monitor } from 'lucide-react'
import { useDownloadModal } from '../context/DownloadModalContext'

export default function DownloadSection() {
  const { openModal } = useDownloadModal()
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
          Free Download - Windows
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Stop losing gigabytes.
          <br />
          <span className="gradient-text">Start cleaning today.</span>
        </h2>

        <p className="text-slate-500 text-lg max-w-lg mx-auto mb-10">
          Download Cypher Clean for free. No account, no subscription. Just point it at a folder and watch the space come back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={openModal}
            className="btn-primary flex items-center gap-3 text-base px-10 py-4 rounded-xl shadow-2xl shadow-blue-600/30"
          >
            <Download size={20} />
            Download for Windows - Free
          </button>
          <div className="text-slate-600 text-sm flex items-center gap-1.5">
            <Monitor size={14} />
            Windows 10 / 11 · 64-bit
          </div>
        </div>

        {/* Unsigned-installer notice */}
        <div className="max-w-2xl mx-auto glass rounded-2xl border border-yellow-500/25 bg-yellow-500/5 p-6 text-left">
          <h3 className="text-white font-semibold text-base mb-2">
            Heads up: Windows may show a SmartScreen warning
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Cypher Clean is an indie project, and code-signing certificates are expensive - we haven't bought one yet. Because the installer isn't signed, Windows SmartScreen will pop up a blue warning saying <em className="text-slate-300">"Windows protected your PC."</em> Nothing is wrong with the file.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            To install: click <strong className="text-white">More info</strong>, then <strong className="text-white">Run anyway</strong>. That's it.
          </p>
        </div>
      </div>
    </section>
  )
}
