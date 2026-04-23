import {
  Scan, Trash2, ShieldCheck, BarChart2, Clock, Bell,
  FolderSearch, Layers, Cpu, Lock
} from 'lucide-react'

const features = [
  {
    icon: <Scan size={22} className="text-cyan-400" />,
    title: 'Deep Project Scanning',
    desc: 'Recursively scans any directory and identifies 18 types of generated/cache folders — from node_modules to .gradle — in seconds.',
    tag: 'Core',
  },
  {
    icon: <ShieldCheck size={22} className="text-green-400" />,
    title: 'Delete-Safety Scoring',
    desc: 'Every folder gets a 0–100% safety score based on last modification time. Color-coded green/yellow/red so you know exactly what\'s safe to delete.',
    tag: 'Smart',
  },
  {
    icon: <Trash2 size={22} className="text-blue-400" />,
    title: 'Bulk Select & Delete',
    desc: 'Select multiple folders at once. A confirmation modal shows the exact bytes you\'re about to free before anything is touched.',
    tag: 'Core',
  },
  {
    icon: <BarChart2 size={22} className="text-purple-400" />,
    title: 'Storage Insights Panel',
    desc: 'Visual breakdown of clearable space by category — Node.js, Python, Rust/Java, Framework, Web Cache — with a live bar chart.',
    tag: 'Insights',
  },
  {
    icon: <Layers size={22} className="text-yellow-400" />,
    title: 'Filter & Sort Controls',
    desc: 'Filter by tech stack category. Sort by size or last modified date. Zero in on the biggest offenders fast.',
    tag: 'Core',
  },
  {
    icon: <Clock size={22} className="text-orange-400" />,
    title: 'Delete History Log',
    desc: 'Tracks the last 200 deletions with path, bytes freed, and timestamp. Never wonder what you cleaned up last week.',
    tag: 'History',
  },
  {
    icon: <Bell size={22} className="text-pink-400" />,
    title: 'Desktop Notifications',
    desc: 'Get an alert when a scan finds more than 500 MB of clearable space — so you can act before your disk fills up.',
    tag: 'Alerts',
  },
  {
    icon: <FolderSearch size={22} className="text-teal-400" />,
    title: 'Explorer Right-Click',
    desc: '"Scan with Cypher Clean" appears in Windows Explorer\'s right-click menu on any folder. One context-menu click to scan.',
    tag: 'Integration',
  },
  {
    icon: <Cpu size={22} className="text-indigo-400" />,
    title: 'AI Project Analysis',
    desc: 'Pro: reads README, package.json, pyproject.toml, pom.xml — detects your tech stack and generates a plain-English project summary powered by AI.',
    tag: 'Pro',
    pro: true,
  },
  {
    icon: <Lock size={22} className="text-cyan-400" />,
    title: '100% Local — Zero Telemetry',
    desc: 'No telemetry, no accounts, no tracking. All scanning and deletion runs on-device. The optional AI analysis (Pro) uses a cloud model — nothing else ever leaves your machine.',
    tag: 'Privacy',
  },
]

function FeatureCard({ icon, title, desc, tag, pro }) {
  return (
    <div className={`glass glass-hover rounded-xl p-6 border ${pro ? 'border-purple-500/30' : 'border-blue-500/10'} relative group`}>
      {pro && (
        <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white uppercase">
          Pro
        </div>
      )}
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-[10px] font-bold tracking-widest text-slate-600 uppercase mb-2">{tag}</div>
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            Everything you need
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Built for developers,{' '}
            <span className="gradient-text">by developers</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every feature was designed around one goal: get rid of junk as fast as possible, without ever risking real work.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>

        {/* Folder types strip */}
        <div className="mt-14 glass rounded-2xl p-6 border border-blue-500/10">
          <p className="text-slate-500 text-xs tracking-widest uppercase font-medium mb-4">
            18 folder types detected automatically
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'node_modules', 'venv', '.venv', '.next', '.nuxt', '.svelte-kit',
              'target', '.gradle', '.vite', '.parcel-cache', '.turbo', '.dart_tool',
              '.flutter', '.expo', 'build', 'out', '.cache', '__pycache__',
            ].map(name => (
              <code
                key={name}
                className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/8 text-cyan-400 border border-blue-500/15 hover:border-cyan-400/40 hover:text-white transition-colors cursor-default"
              >
                {name}
              </code>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
