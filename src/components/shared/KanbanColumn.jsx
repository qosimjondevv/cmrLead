import { useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STAGE_DOT_CLASS } from '@/utils'
import { EmptyState } from './EmptyState'

export function KanbanColumn({
  stageId,
  stageColor,
  title,
  count,
  onCreate,
  quickAddLabel,
  isEmpty,
  emptyTitle,
  emptyDescription,
  footer,
  children,
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stageId })

  return (
    <div className="flex h-full w-72 shrink-0 flex-col sm:w-80">
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-lg border border-b-0 bg-muted/50 px-3 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn('size-2 shrink-0 rounded-full', STAGE_DOT_CLASS[stageColor])} />
          <span className="truncate text-sm font-semibold text-foreground">{title}</span>
          <span className="shrink-0 rounded-full bg-background px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {count}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-thin rounded-b-lg border border-t-0 bg-muted/20 p-2 transition-colors',
          isOver && 'bg-primary/5 ring-2 ring-inset ring-primary/30'
        )}
        style={{ minHeight: 160 }}
      >
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-background hover:text-primary"
          >
            <Plus className="size-3.5" />
            {quickAddLabel}
          </button>
        )}

        {isEmpty && <EmptyState title={emptyTitle} description={emptyDescription} className="py-6" />}

        {children}
      </div>

      {footer}
    </div>
  )
}
