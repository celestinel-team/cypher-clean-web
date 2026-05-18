import { Mail } from 'lucide-react'

const SUPPORT_EMAIL = 'hello@cypherclean.app'

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-700/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            Get in touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Questions?{' '}
            <span className="gradient-text">We reply.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            One developer reads every email. Usually within 24 hours, often faster.
          </p>
        </div>

        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="glass glass-hover rounded-2xl border border-blue-500/15 p-8 sm:p-10 text-center block group"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
            <Mail size={24} className="text-cyan-400" />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Pricing, bugs, feature requests, or anything else - one inbox for everything.
          </p>
          <span className="text-2xl md:text-3xl font-bold gradient-text font-mono break-all">
            {SUPPORT_EMAIL}
          </span>
        </a>
      </div>
    </section>
  )
}
