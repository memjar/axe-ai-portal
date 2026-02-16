'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  {
    name: 'Chat Platforms',
    desc: 'Talk to Cortana from anywhere',
    items: [
      { name: 'Telegram', status: 'stable', desc: 'Full bot API with inline commands, media, and group support' },
      { name: 'Discord', status: 'stable', desc: 'Slash commands, threads, voice channel awareness' },
      { name: 'Slack', status: 'stable', desc: 'Workspace integration with slash commands and threads' },
      { name: 'WhatsApp', status: 'stable', desc: 'Personal and business API support via Baileys' },
      { name: 'Signal', status: 'beta', desc: 'End-to-end encrypted messaging via signal-cli' },
      { name: 'iMessage', status: 'beta', desc: 'macOS native integration via AppleScript bridge' },
      { name: 'Matrix', status: 'stable', desc: 'Decentralized chat with Element/Synapse support' },
      { name: 'Microsoft Teams', status: 'beta', desc: 'Bot Framework integration for enterprise' },
      { name: 'Nostr', status: 'alpha', desc: 'Decentralized social protocol support' },
    ],
  },
  {
    name: 'LLM Providers',
    desc: 'Bring your own brain',
    items: [
      { name: 'Ollama', status: 'stable', desc: 'Run any model locally — Llama, Mistral, Phi, Gemma, and more' },
      { name: 'Groq', status: 'stable', desc: 'Blazing fast inference with LPU hardware' },
      { name: 'Claude (Anthropic)', status: 'stable', desc: 'Claude 3.5 Sonnet, Opus, Haiku via API' },
      { name: 'OpenAI', status: 'stable', desc: 'GPT-4o, GPT-4 Turbo, o1, and all models' },
      { name: 'Google Gemini', status: 'stable', desc: 'Gemini Pro, Ultra via Google AI Studio' },
      { name: 'Mistral', status: 'stable', desc: 'Mistral Large, Medium, Small via API' },
      { name: 'DeepSeek', status: 'stable', desc: 'DeepSeek-V3, Coder, and reasoning models' },
      { name: 'OpenRouter', status: 'stable', desc: 'Access 100+ models through one API key' },
      { name: 'xAI (Grok)', status: 'beta', desc: 'Grok-2 and Grok-2 mini via xAI API' },
      { name: 'Vercel AI SDK', status: 'stable', desc: 'Unified interface for any AI provider' },
    ],
  },
  {
    name: 'Productivity',
    desc: 'Get things done',
    items: [
      { name: 'Google Calendar', status: 'stable', desc: 'View, create, and manage events' },
      { name: 'Gmail', status: 'stable', desc: 'Read, send, and search emails' },
      { name: 'Notion', status: 'beta', desc: 'Read and update Notion databases and pages' },
      { name: 'Obsidian', status: 'beta', desc: 'Read and write to your local vault' },
      { name: 'Todoist', status: 'beta', desc: 'Task management and project tracking' },
      { name: 'GitHub', status: 'stable', desc: 'Issues, PRs, repo management, and CI/CD' },
    ],
  },
  {
    name: 'Smart Home',
    desc: 'Control your space',
    items: [
      { name: 'Home Assistant', status: 'stable', desc: 'Control 2000+ device types via HA API' },
      { name: 'Hue', status: 'stable', desc: 'Direct Philips Hue bridge control' },
      { name: 'Tuya / Smart Life', status: 'beta', desc: 'WiFi devices, plugs, switches' },
      { name: 'MQTT', status: 'stable', desc: 'Generic MQTT for any IoT device' },
    ],
  },
  {
    name: 'Media & Music',
    desc: 'Vibes on demand',
    items: [
      { name: 'Spotify', status: 'stable', desc: 'Play, pause, skip, search, playlists, queue' },
      { name: 'YouTube', status: 'beta', desc: 'Search and play videos, get transcripts' },
      { name: 'Plex', status: 'beta', desc: 'Browse and control your media server' },
      { name: 'Apple Music', status: 'alpha', desc: 'macOS native playback control' },
    ],
  },
  {
    name: 'Developer Tools',
    desc: 'Ship faster',
    items: [
      { name: 'Shell / Terminal', status: 'stable', desc: 'Execute commands with sandboxed permissions' },
      { name: 'Web Scraping', status: 'stable', desc: 'Fetch and parse any URL' },
      { name: 'Code Execution', status: 'stable', desc: 'Run Python, Node, and shell scripts' },
      { name: 'Docker', status: 'beta', desc: 'Container management and monitoring' },
      { name: 'Database', status: 'beta', desc: 'Query SQLite, PostgreSQL, MySQL' },
      { name: 'REST APIs', status: 'stable', desc: 'Call any HTTP endpoint with custom headers' },
    ],
  },
]

const STATUS_COLORS: Record<string, string> = {
  stable: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  beta: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  alpha: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

export default function Integrations() {
  const [filter, setFilter] = useState<string | null>(null)
  const filtered = filter ? CATEGORIES.filter(c => c.name === filter) : CATEGORIES
  const totalCount = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e1e2e]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm group-hover:bg-emerald-500/20 transition-colors">
              C
            </div>
            <span className="font-semibold text-white">Cortana</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Home</Link>
            <a href="https://github.com/memjar/axe-agent" target="_blank" rel="noopener" className="text-sm text-zinc-400 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Integrations</h1>
          <p className="text-xl text-zinc-400 mb-8">
            {totalCount} integrations across {CATEGORIES.length} categories. All built-in. No plugins to install.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                !filter ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 border border-[#1e1e2e] hover:border-zinc-600'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.name}
                onClick={() => setFilter(filter === c.name ? null : c.name)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filter === c.name ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 border border-[#1e1e2e] hover:border-zinc-600'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {filtered.map(cat => (
            <div key={cat.name}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                <p className="text-zinc-400 text-sm">{cat.desc}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map(item => (
                  <div key={item.name} className="p-4 rounded-xl border border-[#1e1e2e] bg-[#12121a] hover:border-emerald-500/20 transition-colors group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${STATUS_COLORS[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-[#1e1e2e]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Missing something?</h2>
          <p className="text-zinc-400 mb-6">Cortana is hackable. Add any integration in ~20 lines of TypeScript.</p>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/memjar/axe-agent" target="_blank" rel="noopener" className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
              Build Your Own
            </a>
            <a href="https://github.com/memjar/axe-agent/issues" target="_blank" rel="noopener" className="px-6 py-3 rounded-lg border border-[#1e1e2e] text-zinc-300 hover:border-emerald-500/30 hover:text-white transition-colors">
              Request Integration
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
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
