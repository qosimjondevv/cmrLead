import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { MoreVertical, Phone, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate, userById } from '@/utils'
import { CALL_SOURCES } from '@/constants'
import {
  Badge,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui'
import { useLanguage } from '@/hooks'

export function CallLeadCard({ lead, onEdit, onDelete, dragDisabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    disabled: dragDisabled,
  })
  const { t, lang } = useLanguage()
  const agent = userById(lead.agentId)
  const SourceIcon = CALL_SOURCES.find((s) => s.id === lead.source)?.icon ?? Phone

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
      <div className="flex items-start gap-2.5">
        <Avatar className="size-8 shrink-0">
          <AvatarFallback>{lead.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-semibold text-foreground">{lead.name}</p>
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
                <DropdownMenuItem onClick={() => onEdit(lead)}>{t('common.edit')}</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(lead)}>
                  {t('common.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <SourceIcon className="size-3 shrink-0" />
            <span className="truncate">
              {t('callCenter.fromAgent')} {agent?.name}
            </span>
            <span className="ml-auto shrink-0">{formatDate(lead.createdAt, lang)}</span>
          </div>
        </div>
      </div>

      {lead.lastMessage && (
        <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
          <MessageSquare className="mt-0.5 size-3 shrink-0" />
          <p className="line-clamp-2">{lead.lastMessage}</p>
        </div>
      )}

      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Phone className="size-3 shrink-0" />
        <span className="truncate">{lead.phone}</span>
      </div>

      {(lead.status || lead.tags?.length > 0) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1 border-t pt-2.5">
          {lead.status && (
            <Badge variant={lead.status === 'missed' ? 'destructive' : 'success'} className="text-[11px]">
              {t(`callCenter.status.${lead.status}`)}
            </Badge>
          )}
          {lead.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
