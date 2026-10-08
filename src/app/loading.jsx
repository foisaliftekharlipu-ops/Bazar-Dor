export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-10 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-[#f0f4f2] rounded-3xl p-6 sm:p-10 h-64 border border-gray-200" />

      {/* Top Risers Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-44 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-white rounded-2xl border border-gray-200" />
          ))}
        </div>
      </div>

      {/* All Products Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-white rounded-2xl border border-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
