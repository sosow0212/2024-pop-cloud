const ContentCardSkeleton = () => {
  return (
    <div className="flex cursor-not-allowed flex-col">
      <div className="skeleton-card h-40 w-full rounded-md bg-slate-500" />
      <div className="flex flex-col items-start justify-center">
        <div className="my-1 flex h-[24px] w-full items-center justify-between">
          <div className="skeleton-card h-full w-1/3 rounded-md bg-slate-500" />

          <div className="skeleton-card h-full w-1/4 rounded-md bg-slate-500" />
        </div>
        <div className="skeleton-card h-[16px] w-[40px] rounded-md bg-slate-500 text-xs" />
      </div>
    </div>
  );
};

export default ContentCardSkeleton;
