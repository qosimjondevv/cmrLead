import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { MoreVertical, Phone, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui'
import { useLanguage } from '@/hooks'

export function CandidateCard({ candidate, onEdit, onDelete, dragDisabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: candidate.id,
    disabled: dragDisabled,
  })
  const { t, lang } = useLanguage()

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'group cursor-grab touch-none rounded-lg border bg-card p-3 shadow-sm transition-shadow active:cursor-grabbing',
        'hover:shadow-md',
        isDragging && 'z-10 opacity-40 shadow-lg'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-semibold text-foreground">{candidate.name}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted-foreground opacity-0 outline-none transition-opacity hover:bg-accent hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
              aria-label={t('common.actions')}
            >
              <MoreVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(candidate)}>{t('common.edit')}</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(candidate)}>
              {t('common.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {candidate.position && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Briefcase className="size-3 shrink-0" />
          <span className="truncate">{candidate.position}</span>
        </div>
      )}

      {candidate.phone && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="size-3 shrink-0" />
          <span className="truncate">{candidate.phone}</span>
        </div>
      )}

      {candidate.note && <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{candidate.note}</p>}

      <div className="mt-3 flex items-center justify-end border-t pt-2.5">
        <span className="shrink-0 text-xs text-muted-foreground">{formatDate(candidate.appliedAt, lang)}</span>
      </div>
    </div>
  )
}
