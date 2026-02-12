'use client'
// Build: 2026-02-12-v3

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-10 animate-fadeOut pointer-events-none">
        <div className="text-6xl text-[#00ff41] mb-4 animate-pulse drop-shadow-[0_0_30px_rgba(0,255,65,0.6)]">
          ◈
        </div>
        <div className="text-sm text-[#00ff41]/70 tracking-[4px] uppercase">
          Observer
        </div>
      </div>

      {/* Observer Auth iframe */}
      <iframe
        src="https://observer.ngrok.app"
        className="w-full h-full border-none"
        allow="camera; microphone"
        title="Observer Authentication"
      />

      <style jsx global>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          50% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        .animate-fadeOut {
          animation: fadeOut 1.5s ease forwards;
        }
      `}</style>
    </main>
  )
}
