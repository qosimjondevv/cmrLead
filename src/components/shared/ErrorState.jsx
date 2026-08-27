import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui'
import { useLanguage } from '@/hooks'

export function ErrorState({ title, description, onRetry }) {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-center">
      <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-6 text-destructive" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title ?? t('errorState.title')}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{description ?? t('errorState.description')}</p>
      {onRetry && (
        <Button size="sm" variant="outline" className="mt-3" onClick={onRetry}>
          {t('common.tryAgain')}
        </Button>
      )}
    </div>
  )
}
