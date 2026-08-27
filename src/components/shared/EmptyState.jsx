import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui'
import { useLanguage } from '@/hooks'

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) {
  const { t } = useLanguage()
  return (
    <div className={`flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-center ${className ?? ''}`}>
      <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title ?? t('emptyState.title')}</p>
      {description && <p className="max-w-xs text-sm text-muted-foreground">{description}</p>}
      {actionLabel && (
        <Button size="sm" className="mt-3" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
