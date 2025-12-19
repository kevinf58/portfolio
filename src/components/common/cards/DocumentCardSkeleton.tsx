const DocumentCardSkeleton = ({ type }: { type: "journal" | "project" }) => {
  return (
    <div className="flex animate-pulse px-10 py-8 gap-4 bg-gray-800 rounded cursor-pointer">
      {type === "project" && <div className="w-60 h-38 flex-shrink-0 bg-gray-700 rounded-sm" />}

      <div className="flex flex-col w-full gap-2">
        {type === "journal" && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-20 h-4 bg-gray-700 rounded" />
            <div className="w-16 h-3 bg-gray-600 rounded" />
            <div className="w-1 h-3 bg-gray-600 rounded" />
            <div className="w-12 h-3 bg-gray-600 rounded" />
          </div>
        )}

        <div className={`h-6 bg-gray-700 rounded ${type === "journal" ? "w-2/3" : "w-full"} mb-2`} />

        <div className="h-4 bg-gray-600 rounded w-full mb-1" />
        <div className="h-4 bg-gray-600 rounded w-5/6 mb-1" />
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-3" />

        <div className="flex gap-2 flex-wrap">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-5 w-12 bg-gray-700 rounded" />
            ))}
        </div>

        {type === "project" && <div className="mt-auto h-4 w-24 bg-gray-700 rounded" />}
      </div>
    </div>
  );
};

export default DocumentCardSkeleton;
