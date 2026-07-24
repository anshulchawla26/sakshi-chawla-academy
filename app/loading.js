export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh">
      <div className="flex flex-col items-center gap-4" role="status" aria-label="Loading">
        <div className="h-12 w-12 rounded-full border-4 border-navy-100 border-t-navy-600 animate-spin" />
        <div className="text-sm font-semibold text-navy-700 uppercase tracking-widest">Loading</div>
      </div>
    </div>
  )
}
