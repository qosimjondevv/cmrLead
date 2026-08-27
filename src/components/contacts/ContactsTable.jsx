import { MoreVertical, Mail, Phone } from 'lucide-react'
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

export function ContactsTable({ contacts, onEdit, onDelete }) {
  const { t, lang } = useLanguage()
  return (
    <div className="hidden overflow-hidden rounded-lg border md:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left text-xs font-medium text-muted-foreground">
            <th className="px-4 py-2.5">{t('contacts.colName')}</th>
            <th className="px-4 py-2.5">{t('contacts.colContact')}</th>
            <th className="px-4 py-2.5">{t('contacts.colCompany')}</th>
            <th className="px-4 py-2.5">{t('contacts.colResponsible')}</th>
            <th className="px-4 py-2.5">{t('contacts.colTags')}</th>
            <th className="px-4 py-2.5">{t('contacts.colCreated')}</th>
            <th className="px-4 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-b last:border-0 hover:bg-accent/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="size-8">
                    <AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{c.name}</p>
                    {c.title && <p className="truncate text-xs text-muted-foreground">{c.title}</p>}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-3" /> {c.phone}
                  </span>
                  {c.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="size-3" /> {c.email}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{c.companyName}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Avatar className="size-5">
                    <AvatarFallback className="text-[10px]">{c.ownerInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{c.ownerName}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {c.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[11px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(c.createdAt, lang)}</td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
