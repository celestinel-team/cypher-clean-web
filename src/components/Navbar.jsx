import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Preview', href: '#preview' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-blue-500/10 shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-black text-white tracking-[0.15em] text-lg uppercase hover:opacity-80 transition-opacity"
          style={{ textShadow: '0 0 20px rgba(56,189,248,0.35)' }}
        >
          CYPHER CLEAN
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all duration-200"
          >
            Get Pro
          </a>
          <a
            href="#download"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Download Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-blue-500/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-slate-300 hover:text-white transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#download" className="btn-primary text-sm text-center mt-2">
            Download Free
          </a>
        </div>
      )}
    </nav>
  )
}
