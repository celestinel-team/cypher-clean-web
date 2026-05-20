import { Check, X, Zap, Shield } from 'lucide-react'

const freeFeatures = [
  { text: 'All 17 folder types detected', included: true },
  { text: 'Delete-safety scoring (0–100%)', included: true },
  { text: 'Up to 30 results per scan', included: true },
  { text: 'Bulk select & delete with confirmation', included: true },
  { text: 'Storage Insights panel + bar chart', included: true },
  { text: 'Filter by category, sort by size/date', included: true },
  { text: 'Delete history log (last 200)', included: true },
  { text: 'Windows system tray support', included: true },
  { text: 'Desktop notifications (>500 MB)', included: true },
  { text: 'Explorer right-click integration', included: true },
  { text: 'Lifetime stats (total freed)', included: true },
  { text: '3 scans per 6-hour window', included: true },
  { text: 'Unlimited scans', included: false },
  { text: 'Full results (30+ folders)', included: false },
  { text: 'AI project analysis', included: false },
]

const proFeatures = [
  { text: 'Everything in Free', included: true },
  { text: 'Unlimited scans - no cooldown', included: true },
  { text: 'All results - no 30-folder cap', included: true },
  { text: 'AI project analysis', included: true },
  { text: 'Tech stack auto-detection from README / package.json', included: true },
  { text: 'License cached locally - works offline for 24 h', included: true },
  { text: 'Cancel anytime - reflected in-app within 60 s', included: true },
]

function FeatureRow({ text, included }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {included
        ? <Check size={15} className="text-green-400 mt-0.5 shrink-0" />
        : <X size={15} className="text-slate-700 mt-0.5 shrink-0" />
      }
      <span className={included ? 'text-slate-300' : 'text-slate-600 line-through'}>{text}</span>
    </li>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-700/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Start free.{' '}
            <span className="gradient-text">Unlock more inside.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            One download. Pro is an in-app activation - no separate installer, no new account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Free */}
          <div className="glass rounded-2xl p-8 border border-blue-500/10 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={18} className="text-slate-400" />
                <span className="text-slate-400 font-semibold text-sm tracking-widest uppercase">Free</span>
              </div>
              <div className="flex items-end gap-2 mt-3">
                <span className="text-5xl font-black text-white">$0</span>
                <span className="text-slate-500 pb-1.5">forever</span>
              </div>
              <p className="text-slate-500 text-sm mt-2">
                Covers 99% of what most devs need. No card, no signup.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {freeFeatures.map((f, i) => <FeatureRow key={i} {...f} />)}
            </ul>

            <div className="mt-auto pt-4">
              <a
                href="#download"
                className="block w-full text-center py-3 rounded-xl border border-blue-500/30 text-blue-400 font-semibold text-sm hover:bg-blue-500/10 transition-colors"
              >
                Download Free
              </a>
            </div>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl p-8 flex flex-col gap-6 border border-blue-500/40"
            style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.6) 0%, rgba(17,34,56,0.8) 100%)' }}>
            {/* Glow */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/10 blur opacity-50 -z-10" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-cyan-400" />
                  <span className="text-cyan-400 font-semibold text-sm tracking-widest uppercase">Pro</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white uppercase whitespace-nowrap">
                  Most Popular
                </span>
              </div>
              <div className="flex items-end gap-2 mt-3">
                <span className="text-5xl font-black text-white">$5</span>
                <span className="text-slate-400 pb-1.5">/ month</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">
                Unlimited scans + AI analysis. Billed via Polar.sh. Activate with a license key inside the app - no reinstall.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {proFeatures.map((f, i) => <FeatureRow key={i} {...f} />)}
            </ul>

            <div className="mt-auto pt-4">
              <a
                href="#download"
                className="btn-primary block w-full text-center py-3 rounded-xl text-sm glow-pulse"
              >
                Get Pro - $5 / month
              </a>
              <p className="text-center text-xs text-slate-600 mt-2">
                License key · Activate inside the app · Cancel anytime
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <p className="text-center text-slate-600 text-sm mt-10">
          <Shield size={13} className="inline mr-1.5 text-slate-500" />
          Cancel anytime · No long-term commitment · Instant activation
        </p>
      </div>
    </section>
  )
}
