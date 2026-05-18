import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Recovered 11 GB on my dev laptop in under a minute. I'd been ignoring node_modules graveyards across 40+ old repos for years. This thing is dangerously satisfying.",
    name: 'Marcus Chen',
    role: 'Senior Frontend Engineer',
    company: 'Fintech startup',
    initials: 'MC',
    freed: '11 GB',
  },
  {
    quote: "The safety scoring is the killer feature. I was nervous to bulk-delete folders, but the green/yellow/red system makes it obvious what's dead weight vs an active project.",
    name: 'Priya Raman',
    role: 'Full-Stack Developer',
    company: 'Freelance',
    initials: 'PR',
    freed: '4 GB',
  },
  {
    quote: "I tried three other cleaners before this. They either nuked things they shouldn't have or required uploading paths to some sketchy cloud. Cypher Clean is local, fast, and doesn't ask for an account.",
    name: 'Jake Tomlinson',
    role: 'Backend Engineer',
    company: 'SaaS company',
    initials: 'JT',
    freed: '7 GB',
  },
  {
    quote: "AI Project Analysis is genuinely useful - it correctly tagged my abandoned Rust experiments and old Next.js prototypes. Pro paid for itself the first week from disk-upgrade money I didn't spend.",
    name: 'Sofia Reyes',
    role: 'Indie Developer',
    company: 'Solo founder',
    initials: 'SR',
    freed: '15 GB',
    pro: true,
  },
  {
    quote: "Right-click → Scan with Cypher Clean is the integration I didn't know I needed. I clean projects as part of my normal workflow now instead of waiting for the disk-full alert.",
    name: 'Daniel Park',
    role: 'DevOps Engineer',
    company: 'E-commerce',
    initials: 'DP',
    freed: '6 GB',
  },
  {
    quote: "Ten seconds to scan my entire ~/code folder. I genuinely don't understand how it's this fast. Best $5 I spend each month on tooling.",
    name: 'Emma Lindqvist',
    role: 'Mobile Developer',
    company: 'Agency',
    initials: 'EL',
    freed: '9 GB',
    pro: true,
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-cyan-400 fill-cyan-400" />
      ))}
    </div>
  )
}

function TestimonialCard({ quote, name, role, company, initials, freed, pro }) {
  return (
    <div className="glass glass-hover rounded-2xl p-6 border border-blue-500/10 relative flex flex-col h-full">
      <Quote
        size={32}
        className="absolute top-5 right-5 text-blue-500/15"
        strokeWidth={1.5}
      />

      {pro && (
        <div className="absolute -top-2 left-6 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white uppercase">
          Pro user
        </div>
      )}

      <Stars />

      <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-blue-500/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{name}</p>
            <p className="text-slate-500 text-xs truncate">{role} · {company}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-cyan-400 text-sm font-mono font-bold">{freed}</p>
          <p className="text-slate-600 text-[10px] tracking-widest uppercase">freed</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[300px] bg-blue-700/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            Loved by developers
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Don't take our word for it.{' '}
            <span className="gradient-text">Take theirs.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Real numbers from real developers who reclaimed gigabytes in seconds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-base mb-5">
            Ready to find out how much you can free up?
          </p>
          <a
            href="#download"
            className="btn-primary inline-block text-sm px-8 py-3.5 rounded-xl glow-pulse"
          >
            Download Free for Windows
          </a>
          <p className="text-slate-600 text-xs mt-3">
            No signup · No card · Scan in 10 seconds
          </p>
        </div>
      </div>
    </section>
  )
}
