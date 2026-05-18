import { ArrowLeft, ShieldCheck } from 'lucide-react'

const lastUpdated = 'May 10, 2026'
const SUPPORT_EMAIL = 'hello@cypherclean.app'

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="text-slate-400 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function Privacy() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      <div className="absolute inset-0 section-grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </a>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
          <ShieldCheck size={12} /> Privacy Policy
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Your data, <span className="gradient-text">your machine.</span>
        </h1>
        <p className="text-slate-600 text-sm mb-12">Last updated: {lastUpdated}</p>

        <div className="glass rounded-2xl border border-blue-500/15 p-6 mb-10">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">The short version:</strong> Cypher Clean runs on your computer. Scanning, deletion, history, and stats never leave your device. The only network requests are: (1) Pro license validation when you activate, and (2) the optional AI Project Analysis feature, which sends a small slice of project metadata to our backend on demand.
          </p>
        </div>

        <Section title="What we collect">
          <p>
            <strong className="text-slate-200">Nothing automatic.</strong> The Free version of Cypher Clean does not send telemetry, analytics, crash reports, or usage data to us or any third party. There is no account creation. There is no advertising SDK.
          </p>
          <p>
            <strong className="text-slate-200">Pro license activation.</strong> When you enter a license key, the app contacts our backend once to validate it and again when the cached license expires (every 24 hours). The validation request includes only your license key. We do not log IP addresses for license checks.
          </p>
          <p>
            <strong className="text-slate-200">AI Project Analysis (Pro, on demand).</strong> If you click "Analyze project" on a folder, the app reads small text manifests like <code className="text-cyan-400 text-xs">README.md</code>, <code className="text-cyan-400 text-xs">package.json</code>, <code className="text-cyan-400 text-xs">pyproject.toml</code>, and <code className="text-cyan-400 text-xs">pom.xml</code>, then sends them to our backend, which forwards them to the underlying language model provider. The folder path itself is sent as a string. Source code, binaries, and the contents of folders flagged for deletion are <em>never</em> uploaded.
          </p>
        </Section>

        <Section title="What we don't collect">
          <ul className="list-disc list-inside space-y-1.5 marker:text-cyan-400">
            <li>Your name, email, phone number, or any identity attributes</li>
            <li>The contents of folders you scan or delete</li>
            <li>The list of folders on your machine</li>
            <li>Source code, configuration secrets, or environment files</li>
            <li>Browsing data, cookies, or device fingerprints</li>
            <li>Crash reports or telemetry of any kind</li>
          </ul>
        </Section>

        <Section title="Where data lives">
          <p>
            Scan results, delete history, and lifetime stats are stored locally in your Windows user profile under <code className="text-cyan-400 text-xs">%LOCALAPPDATA%\CypherClean\</code>. Uninstalling the app or deleting that folder removes all of it.
          </p>
          <p>
            Pro license records and AI Project Analysis request logs (request timestamp + license key, retained 30 days for abuse prevention) live on our backend, hosted in the United States. We never sell or share this data.
          </p>
        </Section>

        <Section title="Payments">
          <p>
            Pro subscriptions are processed by <a href="https://polar.sh" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Polar.sh</a>. Payment details (card numbers, billing address) are handled entirely by Polar - we never see them. Polar shares with us only your license key, plan, and subscription status.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Because we collect no personal data tied to the Free version, there's nothing to request, export, or delete. For Pro: email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:text-cyan-300">{SUPPORT_EMAIL}</a> with your license key and we'll cancel your subscription, delete the associated record, and confirm in writing within 7 days.
          </p>
        </Section>

        <Section title="Children">
          <p>
            Cypher Clean is a developer tool and is not directed at anyone under 13. We do not knowingly collect data from children.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we materially change what data is collected (e.g., adding telemetry), we'll update this page, change the "Last updated" date at the top, and ship a release-note explaining the change. We will not retroactively expand data collection on existing installs without an explicit in-app prompt.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions, concerns, or you'd just like to verify what the app sends? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:text-cyan-300">{SUPPORT_EMAIL}</a>.
          </p>
        </Section>
      </div>
    </div>
  )
}
