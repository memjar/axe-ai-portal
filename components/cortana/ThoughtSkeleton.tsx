'use client';

export function ThoughtSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-[#111111] rounded-lg p-4 border-l-4 border-gray-700 animate-pulse"
        >
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-700 rounded w-24" />
            <div className="h-3 bg-gray-800 rounded w-16" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
