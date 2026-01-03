export default function Loading() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="h-12 w-full max-w-md bg-gray-200 rounded mb-10 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border rounded-lg p-5 h-[350px] flex flex-col">
            <div className="h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="mt-auto flex justify-between items-center">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}