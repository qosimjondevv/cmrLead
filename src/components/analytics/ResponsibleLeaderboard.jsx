import { Avatar, AvatarFallback } from '@/components/ui'
import { useLanguage } from '@/hooks'
import { formatMoney } from '@/utils'

export function ResponsibleLeaderboard({ items }) {
  const { t, lang } = useLanguage()
  return (
    <div className="divide-y">
      {items.map((u) => (
        <div key={u.name} className="flex items-center gap-3 px-4 py-3">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback>{u.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{u.name}</p>
            <p className="text-xs text-muted-foreground">
              {u.count} {t('analytics.dealsCountLabel')}
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-foreground">{formatMoney(u.value, 'USD', lang)}</span>
        </div>
      ))}
    </div>
  )
}
