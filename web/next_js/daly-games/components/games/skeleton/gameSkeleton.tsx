'use client'

export function GameCardSkeleton() {
    return (
        <div className="rounded-xl flex flex-col gap-4 border border-gray-300 animate-pulse">
            <div className="w-full h-44 bg-gray-200 rounded-t-xl" />

            <div className="py-2 px-4 flex flex-col gap-2">                
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                
                <div className="flex flex-row gap-2 items-center">
                    <div className="h-3 bg-gray-200 rounded w-12" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
            </div>
        </div>
    )
}

export function GameRandomSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto border border-gray-300 rounded-xl overflow-hidden animate-pulse">      
      <div className="w-full h-80 bg-gray-200" />

      <div className="p-6 flex flex-col gap-4">
        <div className="h-7 bg-gray-200 rounded w-2/3" />

        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-5 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}
