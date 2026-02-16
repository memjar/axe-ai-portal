'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Data ────────────────────────────────────────────────────────
const INSTALL_MODES = [
  { label: 'One-liner', cmd: 'curl -fsSL https://cortana.ca/install | bash' },
  { label: 'npm', cmd: 'npm install -g @AXE/cortana && cortana start' },
  { label: 'Docker', cmd: 'docker run -d --name cortana -p 18789:18789 axebot/cortana' },
  { label: 'macOS', cmd: 'brew install axebot/tap/cortana && cortana start' },
]

const FEATURES = [
  {
    icon: '🧠',
    title: 'Any LLM. Your Choice.',
    desc: 'Ollama, Groq, Claude, OpenAI, Gemini, Mistral, DeepSeek — swap models in one line. No vendor lock-in.',
  },
  {
    icon: '🔒',
    title: 'Zero Cloud. Zero Fees.',
    desc: 'Everything runs on YOUR hardware. Your conversations never leave your machine. Period.',
  },
  {
    icon: '💬',
    title: 'Every Channel.',
    desc: 'Telegram, Discord, Slack, WhatsApp, iMessage, Signal, Matrix — one AI brain, every platform.',
  },
  {
    icon: '⚡',
    title: '55+ Skills.',
    desc: 'Calendar, email, smart home, music, files, web scraping, code execution, image gen — and growing.',
  },
  {
    icon: '🔧',
    title: 'Hackable.',
    desc: 'TypeScript top to bottom. Add skills in 20 lines. Fork it, mod it, own it. MIT licensed.',
  },
  {
    icon: '📊',
    title: 'Built-in Dashboard.',
    desc: 'Real-time analytics, chat history, channel management, skill toggles — served at localhost:18789.',
  },
]

const INTEGRATIONS = {
  'Chat': ['Telegram', 'Discord', 'Slack', 'WhatsApp', 'Signal', 'iMessage', 'Matrix', 'Teams', 'Nostr'],
  'Models': ['Ollama', 'Groq', 'Claude', 'OpenAI', 'Gemini', 'Mistral', 'DeepSeek', 'OpenRouter'],
  'Skills': ['Calendar', 'Email', 'Spotify', 'HomeAssistant', 'GitHub', 'Notion', 'Obsidian', 'Files', 'Shell'],
}

const STATS = [
  { value: '55+', label: 'Skills' },
  { value: '9', label: 'Chat Channels' },
  { value: '8', label: 'LLM Providers' },
  { value: '0', label: 'Cloud Fees' },
]

// ─── Components ──────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e1e2e]' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm group-hover:bg-emerald-500/20 transition-colors">
            C
          </div>
          <span className="font-semibold text-white">Cortana</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">Features</Link>
          <Link href="#install" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">Install</Link>
          <Link href="/integrations" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">Integrations</Link>
          <a href="https://github.com/memjar/axe-agent" target="_blank" rel="noopener" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">GitHub</a>
          <Link href="/integrations" className="text-sm px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Terminal({ className = '' }: { className?: string }) {
  const [mode, setMode] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_MODES[mode].cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`rounded-xl border border-[#1e1e2e] bg-[#0c0c14] overflow-hidden ${className}`}>
      <div className="flex items-center gap-1 px-4 py-3 border-b border-[#1e1e2e]">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        {INSTALL_MODES.map((m, i) => (
          <button
            key={i}
            onClick={() => setMode(i)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              i === mode ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <code className="text-sm text-emerald-400 font-mono flex-1 overflow-x-auto">
          <span className="text-zinc-500">$ </span>{INSTALL_MODES[mode].cmd}
        </code>
        <button onClick={copy} className="text-zinc-500 hover:text-white transition-colors shrink-0 text-sm">
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="group p-6 rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  )
}

function IntegrationPills() {
  return (
    <div className="space-y-4">
      {Object.entries(INTEGRATIONS).map(([category, items]) => (
        <div key={category}>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">{category}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {items.map(item => (
              <span key={item} className="px-3 py-1 text-sm rounded-full border border-[#1e1e2e] bg-[#12121a] text-zinc-300 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DemoChat() {
  const msgs = [
    { role: 'user' as const, text: 'What\'s the weather like today?' },
    { role: 'ai' as const, text: 'It\'s 4°C in Toronto with light snow. Bundle up! Want me to check your calendar for outdoor plans?' },
    { role: 'user' as const, text: 'Play some lo-fi on Spotify' },
    { role: 'ai' as const, text: 'Now playing "Lo-Fi Beats" on Spotify. Volume set to 40%. Enjoy the vibes.' },
  ]
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible < msgs.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 1200)
      return () => clearTimeout(t)
    }
  }, [visible, msgs.length])

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [visible])

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#0c0c14] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1e1e2e] flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-zinc-500">Cortana — Live Demo</span>
      </div>
      <div ref={ref} className="p-4 space-y-3 h-64 overflow-y-auto">
        {msgs.slice(0, visible).map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
              m.role === 'user'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-[#1a1a2e] text-zinc-300 border border-[#1e1e2e]'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {visible < msgs.length && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#1e1e2e]">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open Source &middot; MIT Licensed
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">Your AI.</span>{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Your Hardware.</span>
              <br />
              <span className="text-white">Your Rules.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Personal AI assistant that runs entirely on your machine.
              55+ skills, every chat platform, any LLM. Zero cloud fees. Zero data leaving your hardware.
            </p>
          </div>

          <div className="animate-fade-in-up-delay-1 max-w-2xl mx-auto mb-12">
            <Terminal />
          </div>

          <div className="animate-fade-in-up-delay-2 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg mx-auto">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo + Integrations side by side */}
      <section className="py-20 px-6 border-t border-[#1e1e2e]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">See it in action</h2>
            <p className="text-zinc-400 text-sm mb-6">Real conversations. Real skills. Running locally.</p>
            <DemoChat />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Connects to everything</h2>
            <p className="text-zinc-400 text-sm mb-6">
              9 chat platforms, 8 LLM providers, dozens of integrations.{' '}
              <Link href="/integrations" className="text-emerald-400 hover:underline">See all →</Link>
            </p>
            <IntegrationPills />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-[#1e1e2e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Everything you need. Nothing you don&apos;t.</h2>
            <p className="text-zinc-400">No subscriptions. No telemetry. No bullshit.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="py-20 px-6 border-t border-[#1e1e2e]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Running in 30 seconds</h2>
          <p className="text-zinc-400 mb-8">Pick your poison. All roads lead to localhost:18789.</p>
          <Terminal className="text-left" />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/memjar/axe-agent" target="_blank" rel="noopener" className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
              View on GitHub
            </a>
            <a href="https://github.com/memjar/axe-agent/wiki" target="_blank" rel="noopener" className="px-6 py-3 rounded-lg border border-[#1e1e2e] text-zinc-300 hover:border-emerald-500/30 hover:text-white transition-colors">
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 px-6 border-t border-[#1e1e2e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Install', desc: 'One command. npm, curl, Docker, or Homebrew. Takes under a minute.' },
              { step: '02', title: 'Connect', desc: 'Point it at any LLM (local Ollama or cloud API). Connect your chat channels.' },
              { step: '03', title: 'Use', desc: 'Talk to Cortana from anywhere. She manages your calendar, plays music, controls your home, writes code.' },
            ].map(s => (
              <div key={s.step} className="p-6 rounded-xl border border-[#1e1e2e] bg-[#12121a]">
                <div className="text-emerald-400 font-mono text-sm mb-3">{s.step}</div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[#1e1e2e]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stop renting your AI.</h2>
          <p className="text-xl text-zinc-400 mb-10">Own it. Run it. No monthly fees. No data harvesting. Just your AI, on your hardware.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/memjar/axe-agent" target="_blank" rel="noopener" className="px-8 py-4 rounded-lg bg-emerald-500 text-white font-semibold text-lg hover:bg-emerald-600 transition-colors">
              Get Cortana Free
            </a>
            <a href="https://discord.gg/cortana" target="_blank" rel="noopener" className="px-8 py-4 rounded-lg border border-[#1e1e2e] text-zinc-300 text-lg hover:border-emerald-500/30 hover:text-white transition-colors">
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">C</div>
            <span>Cortana</span>
            <span className="text-zinc-700">&middot;</span>
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/memjar/axe-agent" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://discord.gg/cortana" target="_blank" rel="noopener" className="hover:text-white transition-colors">Discord</a>
            <Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
