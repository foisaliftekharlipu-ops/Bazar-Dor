export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6 animate-pulse">
      {/* Category Header Skeleton */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
        <div className="h-8 w-48 bg-slate-200 rounded-lg mb-2" />
        <div className="h-4 w-64 bg-slate-100 rounded-md" />
      </div>

      {/* Sort bar skeleton */}
      <div className="h-14 bg-white rounded-2xl border border-slate-200" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-44 bg-white rounded-2xl border border-slate-200"
          />
        ))}
      </div>
    </div>
  );
}
