export default function AdminLoading() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="h-10 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
      </div>

      {/* List Skeleton */}
      <div className="border rounded-lg p-8">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-12 w-full bg-gray-100 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-100 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}