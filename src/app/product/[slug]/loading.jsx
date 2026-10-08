export default function ProductDetailLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded" />

      {/* Top summary card skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-7 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-4 w-56 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="w-32 h-28 bg-gray-100 rounded-2xl" />
      </div>

      {/* Price summary skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-4">
        <div className="h-6 w-36 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-100 rounded-2xl" />
          <div className="h-24 bg-gray-100 rounded-2xl" />
          <div className="h-24 bg-gray-100 rounded-2xl" />
        </div>
      </div>

      {/* Market table skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}
