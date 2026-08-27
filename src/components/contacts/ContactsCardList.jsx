import { MoreVertical, Mail, Phone, Building2 } from 'lucide-react'
import {
  Badge,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui'
import { formatDate } from '@/utils'
import { useLanguage } from '@/hooks'

export function ContactsCardList({ contacts, onEdit, onDelete }) {
  const { t, lang } = useLanguage()
  return (
    <div className="flex flex-col gap-2.5 md:hidden">
      {contacts.map((c) => (
        <div key={c.id} className="rounded-lg border bg-card p-3 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar className="size-9">
                <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                {c.title && <p className="truncate text-xs text-muted-foreground">{c.title}</p>}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                  aria-label={t('common.actions')}
                >
                  <MoreVertical className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(c)}>{t('common.edit')}</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(c)}>
                  {t('common.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2.5 space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Phone className="size-3" /> {c.phone}
            </p>
            {c.email && (
              <p className="flex items-center gap-1.5">
                <Mail className="size-3" /> {c.email}
              </p>
            )}
            {c.companyName && (
              <p className="flex items-center gap-1.5">
                <Building2 className="size-3" /> {c.companyName}
              </p>
            )}
          </div>
          {c.tags?.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {c.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[11px]">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-2.5 flex items-center justify-between border-t pt-2">
            <span className="text-xs text-muted-foreground">{c.ownerName}</span>
            <span className="text-xs text-muted-foreground">{formatDate(c.createdAt, lang)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
