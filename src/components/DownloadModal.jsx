import { useEffect } from 'react'
import { Download as DownloadIcon, X } from 'lucide-react'

const INSTALLER_URL = 'https://github.com/celestinel-team/cypher-clean-releases/releases/latest/download/Cypher-Clean-Setup.exe'

export default function DownloadModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const startDownload = () => {
    const a = document.createElement('a')
    a.href = INSTALLER_URL
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg glass rounded-2xl border border-yellow-500/30 shadow-2xl shadow-black/60 animate-[slideUp_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="p-7 sm:p-8">
          {/* Title */}
          <h2 id="download-modal-title" className="text-2xl font-black text-white tracking-tight mb-2">
            One quick heads up
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Windows may show a SmartScreen warning when you run the installer. <strong className="text-slate-200">Nothing is wrong with the file</strong> - here's why it happens.
          </p>

          {/* Explanation */}
          <div className="rounded-xl bg-blue-500/5 border border-blue-500/15 p-4 mb-5">
            <p className="text-slate-300 text-sm leading-relaxed">
              Cypher Clean is an indie project, and code-signing certificates cost a few hundred dollars per year. We haven't bought one yet, so the installer is unsigned - Windows flags any unsigned app from a small developer with a blue <em className="text-white">"Windows protected your PC"</em> dialog.
            </p>
          </div>

          {/* Steps */}
          <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-3">
            How to install
          </p>
          <ol className="flex flex-col gap-2.5 mb-6">
            {[
              'Run the downloaded installer.',
              <>If a blue warning appears, click <strong className="text-white">More info</strong>.</>,
              <>Then click <strong className="text-white">Run anyway</strong>. That's it.</>,
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                <span className="shrink-0 w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={startDownload}
              className="btn-primary flex items-center justify-center gap-2 text-sm px-6 py-3 rounded-xl"
            >
              <DownloadIcon size={16} />
              Got it, download
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
