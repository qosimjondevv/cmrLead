import { Skeleton } from '@/components/ui'

export function DealCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-3 h-3 w-2/5" />
      <Skeleton className="mt-3 h-4 w-1/3" />
      <div className="mt-3 flex items-center justify-between border-t pt-2.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  )
}
