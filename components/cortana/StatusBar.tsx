'use client';

interface Props {
  isConnected: boolean;
  uptime: number;
  thoughtsToday: number;
}

export function StatusBar({ isConnected, uptime, thoughtsToday }: Props) {
  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        {isConnected ? (
          <div className="construct-indicator">
            <svg width="20" height="20" viewBox="0 0 24 24" className="construct-icon">
              {/* Outer ring */}
              <circle cx="12" cy="12" r="10" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.3" />
              {/* Spinning arc */}
              <circle
                cx="12" cy="12" r="10"
                fill="none"
                stroke="url(#constructGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="20 43"
                className="construct-spin"
              />
              {/* Center core */}
              <circle cx="12" cy="12" r="4" className="construct-core" />
              {/* Inner pulse */}
              <circle cx="12" cy="12" r="2" fill="#22c55e" className="construct-pulse" />
              <defs>
                <linearGradient id="constructGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        ) : (
          <span className="w-3 h-3 rounded-full bg-red-500 opacity-60" />
        )}
        <span className={isConnected ? 'text-[#22c55e] font-medium tracking-wide' : 'text-red-400'}>
          {isConnected ? 'Construct' : 'OFFLINE'}
        </span>
      </div>

      {/* Uptime */}
      <div className="text-gray-500">
        {formatUptime(uptime)}
      </div>

      {/* Thoughts counter */}
      <div className="text-gray-500">
        {thoughtsToday} thoughts
      </div>
    </div>
  );
}

function formatUptime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) {
    return `${mins}m`;
  }
  return `${hours}h ${mins}m`;
}
