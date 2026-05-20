import { FolderOpen, ScanSearch, ShieldCheck, Trash2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <FolderOpen size={28} className="text-cyan-400" />,
    title: 'Choose a Directory',
    desc: 'Point Cypher Clean at any project root - a single repo or your whole Coding folder.',
    detail: 'Any path, any drive. UNC and external drives supported.',
  },
  {
    number: '02',
    icon: <ScanSearch size={28} className="text-blue-400" />,
    title: 'Scan in Seconds',
    desc: 'Finds all 17 folder types across hundreds of projects in ~10 seconds.',
    detail: 'Multithreaded - won\'t lock up your machine.',
  },
  {
    number: '03',
    icon: <ShieldCheck size={28} className="text-green-400" />,
    title: 'Review Safety Scores',
    desc: 'Color-coded scores: green is safe, yellow modified recently, red hands-off.',
    detail: 'Filter, sort, and bulk-select with ease.',
  },
  {
    number: '04',
    icon: <Trash2 size={28} className="text-red-400" />,
    title: 'Delete with Confidence',
    desc: 'Confirm the total bytes once. Done.',
    detail: 'Every deletion is logged to history.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 section-grid-bg opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-700/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            From messy disk to{' '}
            <span className="gradient-text">clean slate</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Four steps. Under a minute. No surprises.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-blue-500/40 to-transparent z-0" style={{ width: 'calc(100% - 2.5rem)', left: 'calc(100% - 1.25rem)' }} />
              )}

              <div className="glass glass-hover rounded-xl p-6 border border-blue-500/10 relative z-10 h-full flex flex-col gap-4">
                {/* Step number + icon */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900/60 to-blue-800/30 border border-blue-500/20 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-white/5 leading-none">{step.number}</span>
                </div>

                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{step.desc}</p>
                <p className="text-xs text-slate-600 border-t border-white/5 pt-3 mt-auto">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-600 text-sm mt-10 break-words">
          Regenerating a deleted folder is always one terminal command away.{' '}
          <span className="text-slate-500">
            <code className="font-mono text-xs text-blue-400 break-all">npm install</code>,{' '}
            <code className="font-mono text-xs text-blue-400 break-all">pip install -r requirements.txt</code> - your toolchain rebuilds it.
          </span>
        </p>
      </div>
    </section>
  )
}
