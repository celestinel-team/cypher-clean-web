import { ExternalLink } from 'lucide-react'

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/10 py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="font-black text-white tracking-[0.15em] text-base uppercase"
                style={{ textShadow: '0 0 20px rgba(56,189,248,0.35)' }}
              >
                CYPHER CLEAN
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Privacy-first disk cleaner for developers. Scans local project directories, scores folders for deletion safety, and frees up gigabytes in seconds.
            </p>
            <p className="text-slate-700 text-xs mt-4">
              No telemetry · No accounts · Windows
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">Product</h4>
            <ul className="flex flex-col gap-2.5">
              {['Features', 'How It Works', 'Pricing', 'Download', 'Changelog'].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-slate-600 hover:text-slate-300 text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {['FAQ', 'Contact', 'Privacy Policy', 'Terms of Use'].map(l => (
                <li key={l}>
                  <a href="#" className="text-slate-600 hover:text-slate-300 text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-700 text-xs">
            © {new Date().getFullYear()} Cypher Clean. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-700 hover:text-slate-400 transition-colors" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="#" className="text-slate-700 hover:text-slate-400 transition-colors" aria-label="X / Twitter">
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
