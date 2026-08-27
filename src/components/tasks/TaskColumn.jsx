import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TaskCard } from './TaskCard'
import { EmptyState } from '@/components/shared'
import { useLanguage } from '@/hooks'

const HEADER_ACCENT = {
  overdue: 'border-t-destructive',
  today: 'border-t-primary',
  tomorrow: 'border-t-info',
  thisWeek: 'border-t-purple',
  nextWeek: 'border-t-warning',
  later: 'border-t-muted-foreground/40',
}

export function TaskColumn({ bucket, tasks, dealNameById, onToggle, onDelete, onCreate }) {
  const { t } = useLanguage()

  return (
    <div className="flex h-full w-72 shrink-0 flex-col sm:w-80">
      <div
        className={cn(
          'sticky top-0 z-10 rounded-t-lg border border-b-0 border-t-2 bg-muted/50 px-3 py-2.5',
          HEADER_ACCENT[bucket]
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate text-sm font-semibold text-foreground">
            {t(`taskBuckets.${bucket}`)}
          </span>
          <span className="shrink-0 rounded-full bg-background px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
      </div>

      <div
        className="flex flex-1 flex-col gap-2 overflow-y-auto scrollbar-thin rounded-b-lg border border-t-0 bg-muted/20 p-2"
        style={{ minHeight: 160 }}
      >
        <button
          type="button"
          onClick={() => onCreate(bucket)}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-background hover:text-primary"
        >
          <Plus className="size-3.5" />
          {t('pipeline.quickAdd')}
        </button>

        {tasks.length === 0 && (
          <EmptyState title={t('tasks.noTasksInBucket')} className="py-6" />
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            dealName={dealNameById[task.dealId]}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
