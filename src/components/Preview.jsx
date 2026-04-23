import { useState } from 'react'
import cl1 from '../assets/CL1.png'
import cl2 from '../assets/CL2.png'
import cl3 from '../assets/CL3.png'

const tabs = [
  {
    label: 'Dashboard',
    desc: 'Main scan view — Storage Insights panel with total clearable space, folder count, largest folder, and a breakdown by tech stack.',
    img: cl1,
    alt: 'Cypher Clean dashboard showing 4.36 GB clearable space across 62 folders',
    highlights: ['4.36 GB found in one scan', '62 cleanup candidates', 'Live safety scores on every folder'],
  },
  {
    label: 'Storage Breakdown',
    desc: 'Visual bar chart of disk usage per category — instantly see that Node.js is eating 81% of your recoverable space.',
    img: cl2,
    alt: 'Storage insights panel showing bar chart breakdown by folder type',
    highlights: ['Per-category breakdown', 'Proportional bar charts', 'Node.js, Python, Rust/Java, Web Cache and more'],
  },
  {
    label: 'Folder List',
    desc: 'Full list of every found folder with path, size, safety score badge, and Delete / Open / Analyze buttons.',
    img: cl3,
    alt: 'Folder list showing project paths, sizes, and delete actions',
    highlights: ['Full path shown', 'One-click delete per folder', 'Safety % badge on every row'],
  },
]

export default function Preview() {
  const [active, setActive] = useState(0)

  return (
    <section id="preview" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            Product Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            See what's{' '}
            <span className="gradient-text">eating your disk</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Every byte is visible. Nothing is deleted without your confirmation.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === i
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Screenshot frame */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-transparent rounded-2xl blur-xl" />
          <div className="relative glass rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-black/50">
            {/* Window chrome */}
            <div className="bg-[#0a1628]/90 px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-slate-600 font-mono">CYPHER CLEAN — v1.0</span>
              </div>
            </div>
            <img
              src={tabs[active].img}
              alt={tabs[active].alt}
              className="w-full block transition-opacity duration-300"
              key={active}
            />
          </div>
        </div>

        {/* Caption + highlights */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm mb-4">{tabs[active].desc}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tabs[active].highlights.map((h, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
