const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Download', href: '#download' },
  // { label: 'Changelog', href: '#changelog' },
]

const supportLinks = [
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#/privacy' },
  { label: 'Terms of Use', href: '#/terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/10 py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <a
                href="#"
                className="font-black text-white tracking-[0.15em] text-base uppercase"
                style={{ textShadow: '0 0 20px rgba(56,189,248,0.35)' }}
              >
                CYPHER CLEAN
              </a>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Privacy-first disk cleaner with AI project analysis. Scans local project directories, scores folders for deletion safety, and frees up gigabytes in seconds.
            </p>
            <p className="text-slate-700 text-xs mt-4">
              No telemetry · No accounts · Windows (Mac coming)
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">Product</h4>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-slate-600 hover:text-slate-300 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-slate-600 hover:text-slate-300 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-slate-700 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Cypher Clean. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
