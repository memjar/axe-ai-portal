'use client'

import { useState } from 'react'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="axe-title text-4xl font-bold mb-2">AXE</h1>
        <p className="font-prometheus text-sm text-gray-400">Canada's AI Assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-4 rounded-lg border ${
            msg.role === 'user'
              ? 'bg-gray-900 border-gray-700 ml-auto max-w-[80%]'
              : 'bg-gray-800 border-green-900/30 max-w-[80%]'
          }`}>
            <div className="font-semibold mb-2 font-prometheus text-sm">
              {msg.role === 'user' ? (
                <span className="text-blue-400">You</span>
              ) : (
                <span className="text-green-400 text-glow">AXE</span>
              )}
            </div>
            <div className="text-gray-100 leading-relaxed">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="text-center font-prometheus text-green-400 text-glow loading">
            <span className="inline-block">🧠</span> Extended Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t border-gray-800 pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Message AXE..."
          className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  )
}
