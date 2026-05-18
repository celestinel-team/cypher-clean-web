import { ArrowLeft, FileText } from 'lucide-react'

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

export default function Terms() {
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
          <FileText size={12} /> Terms of Use
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          The fine print, <span className="gradient-text">in plain English.</span>
        </h1>
        <p className="text-slate-600 text-sm mb-12">Last updated: {lastUpdated}</p>

        <div className="glass rounded-2xl border border-blue-500/15 p-6 mb-10">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">The short version:</strong> Use Cypher Clean however you like, on as many of your machines as you like. Don't redistribute or resell it. We try hard to make it safe, but you confirm every deletion - we can't be liable for files you choose to delete.
          </p>
        </div>

        <Section title="1. Acceptance">
          <p>
            By downloading, installing, or using Cypher Clean (the "Software"), you agree to these Terms. If you don't agree, don't install the Software.
          </p>
        </Section>

        <Section title="2. License">
          <p>
            <strong className="text-slate-200">Free version.</strong> We grant you a non-exclusive, non-transferable, royalty-free license to install and run the Free version of the Software on personal and work machines you control, with no limit on the number of machines.
          </p>
          <p>
            <strong className="text-slate-200">Pro version.</strong> An active Pro subscription gives the same rights, plus access to Pro-only features (unlimited scans, full results, AI Project Analysis), for as long as your subscription is current. License keys are tied to the purchasing account but may be activated on your own machines.
          </p>
          <p>
            You may not: redistribute the installer, sell or sublicense the Software, reverse-engineer it for the purpose of building a competing product, or remove copyright/attribution notices.
          </p>
        </Section>

        <Section title="3. Subscriptions and billing">
          <p>
            Pro is billed monthly through Polar.sh at the price shown on the pricing page at the time you subscribe. Subscriptions renew automatically until cancelled. You may cancel anytime from your Polar billing portal; the cancellation reflects in-app within 60 seconds, and Pro features remain available until the end of the paid period.
          </p>
          <p>
            <strong className="text-slate-200">Refunds.</strong> If Pro doesn't work for you, email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:text-cyan-300">{SUPPORT_EMAIL}</a> within 14 days of a charge and we'll refund it, no questions asked.
          </p>
        </Section>

        <Section title="4. The deletion warning">
          <p>
            Cypher Clean deletes folders. That's the entire point. Before any deletion, the app shows you the exact paths and total bytes affected and requires explicit confirmation. The safety scoring is a heuristic - it's good, but it's not infallible.
          </p>
          <p>
            <strong className="text-slate-200">You are responsible</strong> for what you choose to delete. Always have backups of work you can't afford to lose. We strongly recommend not running the Software on system folders, OS install directories, or anything outside a project workspace.
          </p>
        </Section>

        <Section title="5. Acceptable use">
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-1.5 marker:text-cyan-400">
            <li>Use the Software to delete files you don't have permission to modify</li>
            <li>Abuse the AI Project Analysis endpoint (e.g., scripted bulk requests outside normal app use)</li>
            <li>Attempt to bypass Pro license validation or share license keys publicly</li>
            <li>Use the Software in any way that violates applicable law</li>
          </ul>
        </Section>

        <Section title="6. AI Project Analysis (Pro)">
          <p>
            AI Project Analysis sends project metadata (README, manifest files) to a third-party language-model provider via our backend. The output is generated by an AI model and may be inaccurate, incomplete, or out of date. Treat it as a hint, not as ground truth.
          </p>
        </Section>

        <Section title="7. Disclaimer of warranties">
          <p className="uppercase text-xs tracking-wider text-slate-500">
            The Software is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Software will be uninterrupted, error-free, or that it will not delete a file you later wish you had kept.
          </p>
        </Section>

        <Section title="8. Limitation of liability">
          <p className="uppercase text-xs tracking-wider text-slate-500">
            To the maximum extent permitted by law, Cypher Clean and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or revenue, arising out of your use of the Software. Total aggregate liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim, or USD $50, whichever is greater.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>
            You may stop using and uninstall the Software at any time. We may suspend or terminate your Pro license if you materially breach these Terms (e.g., publicly sharing license keys); we'll email you first when we can. Sections 4, 7, 8, and 10 survive termination.
          </p>
        </Section>

        <Section title="10. Changes and contact">
          <p>
            We may update these Terms from time to time. Material changes will be reflected in the "Last updated" date and noted in release notes. Continued use of the Software after changes constitutes acceptance.
          </p>
          <p>
            Questions? <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:text-cyan-300">{SUPPORT_EMAIL}</a>.
          </p>
        </Section>
      </div>
    </div>
  )
}
