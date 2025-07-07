const Skeleton = () => {
  return (
    <div className="w-full min-w-[320px] max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl mb-6 p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="mx-1 w-2 h-2 bg-gray-200 rounded-full" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-6 sm:h-8 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
      <div className="h-3 w-20 bg-gray-200 rounded" />
    </div>
  )
}

export default Skeleton