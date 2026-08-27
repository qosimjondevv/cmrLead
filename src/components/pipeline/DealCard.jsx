import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { MoreVertical, Building2, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMoney, formatDate } from '@/utils'
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui'
import { useLanguage } from '@/hooks'

export function DealCard({ deal, onEdit, onDelete, dragDisabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
    disabled: dragDisabled,
  })
  const { t, lang } = useLanguage()

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined

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
        <p className="truncate text-sm font-semibold text-foreground">{deal.title}</p>
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
            <DropdownMenuItem onClick={() => onEdit(deal)}>{t('common.edit')}</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(deal)}>
              {t('common.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {deal.companyName && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3 shrink-0" />
          <span className="truncate">{deal.companyName}</span>
        </div>
      )}

      {deal.contactName && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="size-3 shrink-0" />
          <span className="truncate">{deal.contactName}</span>
        </div>
      )}

      <p className="mt-2 text-sm font-semibold text-foreground">{formatMoney(deal.value, deal.currency, lang)}</p>

      <div className="mt-3 flex items-center justify-between border-t pt-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <Avatar className="size-5">
            <AvatarFallback className="text-[10px]">{deal.ownerInitials}</AvatarFallback>
          </Avatar>
          <span className="truncate text-xs text-muted-foreground">{deal.ownerName}</span>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{formatDate(deal.createdAt, lang)}</span>
      </div>
    </div>
  )
}
