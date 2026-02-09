'use client';

import { CortanaStats, MoodType } from '@/types/cortana';

const MOOD_EMOJIS: Record<MoodType, string> = {
  focused: '',
  curious: '',
  satisfied: '',
  frustrated: '',
  breakthrough: '',
};

const MOOD_COLORS: Record<MoodType, string> = {
  focused: 'text-blue-400',
  curious: 'text-yellow-400',
  satisfied: 'text-green-400',
  frustrated: 'text-red-400',
  breakthrough: 'text-purple-400',
};

interface Props {
  stats: CortanaStats;
}

export function StatsPanel({ stats }: Props) {
  return (
    <div className="space-y-6">
      {/* Current Focus */}
      <div className="bg-[#111111] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">
          CURRENT FOCUS
        </h3>
        <p className="text-[#00d4ff] font-medium">
          {stats.currentFocus || 'Idle'}
        </p>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{stats.focusProgress}%</span>
          </div>
          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00d4ff] rounded-full transition-all duration-500"
              style={{ width: `${stats.focusProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="bg-[#111111] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">
          TODAY&apos;S STATS
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Thoughts</span>
            <span className="text-[#e0e0e0]">{stats.thoughtsToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Insights</span>
            <span className="text-yellow-400">{stats.insightsToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Questions Open</span>
            <span className="text-red-400">{stats.questionsOpen}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Predictions</span>
            <span className="text-purple-400">{stats.predictionsAccuracy}% accurate</span>
          </div>
        </div>
      </div>

      {/* Mood Indicator */}
      <div className="bg-[#111111] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">
          CURRENT MOOD
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-lg ${MOOD_COLORS[stats.mood] || 'text-blue-400'}`}>
            {MOOD_EMOJIS[stats.mood] || ''}
          </span>
          <span className={`capitalize ${MOOD_COLORS[stats.mood] || 'text-blue-400'}`}>
            {stats.mood}
          </span>
        </div>
      </div>

      {/* Uptime */}
      <div className="bg-[#111111] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">
          SESSION
        </h3>
        <p className="text-2xl font-mono text-[#00d4ff]">
          {formatUptime(stats.uptime)}
        </p>
      </div>
    </div>
  );
}

function formatUptime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
