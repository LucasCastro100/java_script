export const ProductListSkeleton = () => {
    return (
        <div className="mt-8">
            <div className="bg-gray-200 rounded w-52 h-8 mb-4 mx-auto md:mx-0 animate-pulse"></div>
            <div className="bg-gray-200 rounded w-64 h-5 mb-4 mx-auto md:mx-0 animate-pulse"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-200 h-80 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-80 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-80 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-80 rounded animate-pulse"></div>
            </div>
        </div>

    );
}