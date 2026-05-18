import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({ value, suffix, label, delay = 0, started, static: isStatic, display }) {
  const num = useCountUp(value, 1800, started && !isStatic)
  return (
    <div className="text-center" style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-black text-white mb-2">
        <span className="gradient-text">{isStatic ? display : num}</span>
        <span className="text-cyan-400">{suffix}</span>
      </div>
      <p className="text-slate-500 text-sm tracking-wide uppercase">{label}</p>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-blue-800/15 to-blue-900/10" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="glass rounded-2xl border border-blue-500/15 px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatCard value={17} suffix="+" label="Folder types detected" started={visible} delay={0} />
            <StatCard value={4} suffix=" GB+" label="Avg space recovered" started={visible} delay={150} />
            <StatCard value={0} suffix="" label="Telemetry collected" started={visible} delay={300} static display="Zero" />
            <StatCard value={10} suffix="s" label="Typical scan time" started={visible} delay={450} />
          </div>
        </div>
      </div>
    </section>
  )
}
