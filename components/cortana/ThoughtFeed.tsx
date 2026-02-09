'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThoughtEntry, ThoughtType } from '@/types/cortana';

const TYPE_LABELS: Record<ThoughtType, string> = {
  thought: 'THOUGHT',
  insight: 'INSIGHT',
  question: 'QUESTION',
  focus: 'FOCUS',
  prediction: 'PREDICTION',
  first_principles: 'FIRST PRINCIPLES',
  achievement: 'ACHIEVEMENT',
  reflection: 'REFLECTION',
  status: 'STATUS',
  progress: 'PROGRESS',
};

const TYPE_COLORS: Record<ThoughtType, string> = {
  thought: 'border-gray-600',
  insight: 'border-yellow-500',
  question: 'border-red-400',
  focus: 'border-blue-500',
  prediction: 'border-purple-500',
  first_principles: 'border-green-500',
  achievement: 'border-yellow-400',
  reflection: 'border-cyan-400',
  status: 'border-gray-500',
  progress: 'border-blue-400',
};

const FILTER_BUTTON_COLORS: Record<ThoughtType | 'all', string> = {
  all: 'bg-gray-700 hover:bg-gray-600',
  thought: 'bg-gray-700 hover:bg-gray-600',
  insight: 'bg-yellow-900/50 hover:bg-yellow-800/50',
  question: 'bg-red-900/50 hover:bg-red-800/50',
  focus: 'bg-blue-900/50 hover:bg-blue-800/50',
  prediction: 'bg-purple-900/50 hover:bg-purple-800/50',
  first_principles: 'bg-green-900/50 hover:bg-green-800/50',
  achievement: 'bg-yellow-900/50 hover:bg-yellow-800/50',
  reflection: 'bg-cyan-900/50 hover:bg-cyan-800/50',
  status: 'bg-gray-700 hover:bg-gray-600',
  progress: 'bg-blue-900/50 hover:bg-blue-800/50',
};

interface Props {
  thoughts: ThoughtEntry[];
}

export function ThoughtFeed({ thoughts }: Props) {
  const [filter, setFilter] = useState<ThoughtType | 'all'>('all');
  const [search, setSearch] = useState('');

  // Apply filters
  let filteredThoughts = filter === 'all'
    ? thoughts
    : thoughts.filter(t => t.type === filter);

  // Apply search
  if (search.trim()) {
    const searchLower = search.toLowerCase();
    filteredThoughts = filteredThoughts.filter(t =>
      t.content.toLowerCase().includes(searchLower) ||
      t.metadata?.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Get unique types from thoughts for filter buttons
  const availableTypes = Array.from(new Set(thoughts.map(t => t.type)));

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Escape clears filters and search
    if (e.key === 'Escape') {
      setFilter('all');
      setSearch('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="space-y-4">
      {/* Header with filters */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-gray-400">
          LIVE FEED
        </h2>
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              filter === 'all'
                ? 'bg-[#00d4ff] text-black'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            ALL
          </button>
          {availableTypes.slice(0, 5).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                filter === type
                  ? 'bg-[#00d4ff] text-black'
                  : `${FILTER_BUTTON_COLORS[type] || 'bg-gray-700'} text-gray-300`
              }`}
            >
              {TYPE_LABELS[type] || type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search thoughts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-[#111111] border border-[#1a1a1a] rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#00d4ff] text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            x
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredThoughts.map((thought, index) => (
          <div
            key={thought.id}
            className={`
              bg-[#111111] rounded-lg p-4 border-l-4
              ${TYPE_COLORS[thought.type] || 'border-gray-600'}
              ${index === 0 ? 'animate-fade-in' : ''}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold uppercase text-gray-400">
                  {TYPE_LABELS[thought.type] || thought.type.toUpperCase().replace('_', ' ')}
                </span>
                {isRecent(thought.timestamp) && (
                  <span className="text-xs px-1.5 py-0.5 bg-[#00d4ff] text-black rounded font-semibold">
                    NEW
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-600">
                {formatTime(thought.timestamp)}
              </span>
            </div>

            {/* Content */}
            <p className="text-[#e0e0e0] leading-relaxed whitespace-pre-wrap">
              {thought.content}
            </p>

            {/* Copy button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(thought.content);
              }}
              className="mt-2 text-xs text-gray-600 hover:text-gray-400 transition-colors"
              title="Copy to clipboard"
            >
              copy
            </button>

            {/* Metadata */}
            {thought.metadata?.confidence !== undefined && (
              <div className="mt-2 text-xs text-gray-500">
                Confidence: {thought.metadata.confidence}%
              </div>
            )}

            {thought.metadata?.score !== undefined && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00d4ff] rounded-full transition-all duration-500"
                      style={{ width: `${thought.metadata.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {thought.metadata.score}/100
                  </span>
                </div>
              </div>
            )}

            {/* Tags */}
            {thought.metadata?.tags && thought.metadata.tags.length > 0 && (
              <div className="mt-2 flex gap-1 flex-wrap">
                {thought.metadata.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-[#1a1a1a] rounded text-gray-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredThoughts.length === 0 && thoughts.length > 0 && (
        <div className="text-center py-8 text-gray-600">
          <p>No {filter} thoughts yet.</p>
        </div>
      )}

      {thoughts.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <span className="text-4xl block mb-4">...</span>
          <p>Cortana is thinking...</p>
        </div>
      )}
    </div>
  );
}

function isRecent(timestamp: string): boolean {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  return diffMins < 2; // Thought is "new" if less than 2 minutes old
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  // Show relative time for recent thoughts
  if (diffMins < 1) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  // Show absolute time for older thoughts
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}
