import { Check, Trash2, Briefcase } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui'
import { cn } from '@/lib/utils'
import { userById, formatDate } from '@/utils'
import { useLanguage } from '@/hooks'

export function TaskCard({ task, dealName, onToggle, onDelete }) {
  const { t, lang } = useLanguage()
  const assignee = userById(task.assignee)
  const overdue = !task.done && new Date(task.dueDate) < new Date(new Date().toDateString())

  return (
    <div className="group rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          role="checkbox"
          aria-checked={task.done}
          onClick={() => onToggle(task.id)}
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
            'border-input hover:border-primary hover:bg-primary/5'
          )}
        >
          <Check className="size-3.5 text-transparent transition-colors group-hover:text-primary/40" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug text-foreground">{task.title}</p>

          {dealName && (
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-primary">
              <Briefcase className="size-3 shrink-0" />
              {dealName}
            </p>
          )}

          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span className={cn('text-xs text-muted-foreground', overdue && 'font-medium text-destructive')}>
              {formatDate(task.dueDate, lang)}
            </span>
            <div className="flex shrink-0 items-center gap-1.5">
              <Avatar className="size-5">
                <AvatarFallback className="text-[9px]">{assignee?.initials}</AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                aria-label={t('common.delete')}
                className="rounded-md p-1 text-muted-foreground opacity-0 outline-none transition-opacity hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
