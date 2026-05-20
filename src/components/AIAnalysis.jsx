import { Sparkles, FileSearch, Layers, Cpu, ShieldCheck, ArrowRight } from 'lucide-react'
import clPro2 from '../assets/CL_PRO2.png'
import { useDownloadModal } from '../context/DownloadModalContext'

const cards = [
  {
    icon: <FileSearch size={16} className="text-cyan-400" />,
    title: 'What this project is for',
    body: 'Extract information from voice input and provide responses using AI, accessible via a web interface.',
  },
  {
    icon: <Layers size={16} className="text-cyan-400" />,
    title: 'How it works at a high level',
    body: 'Users submit voice recordings through a Flask web app. Whisper transcribes audio, OpenAI processes text, and results are stored via SQLAlchemy with PostgreSQL.',
  },
  {
    icon: <Cpu size={16} className="text-cyan-400" />,
    title: 'Main technologies / frameworks',
    body: 'Python, Flask, Whisper, OpenAI API, SQLAlchemy, psycopg2-binary, python-dotenv.',
  },
]

const bullets = [
  'Reads README, package.json, pyproject.toml, pom.xml & more',
  'Auto-detects tech stack and tags every project',
  'Three plain-English cards: purpose, architecture, stack',
  'Only metadata is sent - never source code',
]

export default function AIAnalysis() {
  const { openModal } = useDownloadModal()

  return (
    <section id="ai-analysis" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 section-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[400px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium tracking-widest uppercase mb-4">
            <Sparkles size={12} />
            Pro feature
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Don't recognize a folder?{' '}
            <span className="gradient-text">Let AI explain it.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            One click on any project and Cypher Clean reads its config files, detects the stack, and writes a plain-English summary - so you know exactly what you're about to delete.
          </p>
        </div>

        {/* Two-column showcase */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Screenshot */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 via-cyan-500/15 to-transparent rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-blue-500/25 shadow-2xl shadow-black/60">
              <img
                src={clPro2}
                alt="Cypher Clean Pro - AI Project Analysis modal showing metadata, tech tags, and three GPT-generated summary cards"
                className="w-full block"
              />
            </div>
            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-blue-600/40">
              Powered by GPT-4.1
            </div>
          </div>

          {/* Right — Sample output cards */}
          <div className="order-1 lg:order-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-400 uppercase">
              <span className="w-8 h-px bg-blue-400/50" />
              Sample analysis output
            </div>

            {cards.map((c, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 border border-blue-500/15 hover:border-cyan-400/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{c.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed pl-9">{c.body}</p>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {['python', 'flask', 'whisper', 'openai', 'sqlalchemy'].map(tag => (
                <code
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/8 text-cyan-400 border border-blue-500/15"
                >
                  {tag}
                </code>
              ))}
            </div>
          </div>
        </div>

        {/* Bullets + CTA */}
        <div className="mt-14 glass rounded-2xl p-6 md:p-8 border border-blue-500/15">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">
                Built for the folder you forgot you owned.
              </h3>
              <ul className="space-y-2.5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm">
                    <ShieldCheck size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="text-slate-500 text-xs tracking-widest uppercase font-medium">
                Included with Pro
              </p>
              <p className="text-white text-3xl font-black">
                $5<span className="text-slate-500 text-base font-medium">/month</span>
              </p>
              <button
                type="button"
                onClick={openModal}
                className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3 rounded-xl"
              >
                Try AI Analysis in Pro
                <ArrowRight size={16} />
              </button>
              <p className="text-slate-600 text-xs">
                Cancel anytime · Free tier works without it
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
