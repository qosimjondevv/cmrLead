import { Bell, X } from 'lucide-react'
import { Button, Popover, PopoverTrigger, PopoverContent, Skeleton } from '@/components/ui'
import { useLanguage, useNotifications } from '@/hooks'
import { formatRelativeTime, getNotificationText } from '@/utils'
import { cn } from '@/lib/utils'

export function NotificationBell() {
  const { t } = useLanguage()
  const { notifications, loading, error, unreadCount, markRead, remove } = useNotifications()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={t('header.notifications')}>
          <Bell className="size-[18px]" />
          {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-semibold">{t('header.notifications')}</p>
        </div>
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {loading && (
            <div className="space-y-3 p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}
          {!loading && error && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              {t('header.notificationsLoadError')}
            </p>
          )}
          {!loading && !error && notifications.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">{t('header.noNotifications')}</p>
          )}
          {!loading &&
            !error &&
            notifications.map((n) => {
              const { title, message } = getNotificationText(n, t)
              return (
              <div key={n.id} className="group flex items-start gap-2 border-b px-4 py-3 last:border-0 hover:bg-accent/50">
                <button
                  type="button"
                  onClick={() => !n.read && markRead(n.id)}
                  className="flex flex-1 items-start gap-2 text-left"
                >
                  <div
                    className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-primary')}
                  />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-sm leading-snug',
                        n.read ? 'text-muted-foreground' : 'font-medium text-foreground'
                      )}
                    >
                      {title}
                    </p>
                    {message && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{message}</p>}
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{formatRelativeTime(n.created_at, t)}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => remove(n.id)}
                  aria-label={t('common.delete')}
                  className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 outline-none transition-opacity hover:bg-accent hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              )
            })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
