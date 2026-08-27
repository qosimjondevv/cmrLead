import { formatMoney } from '@/utils'
import { useLanguage } from '@/hooks'

export function PipelineSummary({ count, value }) {
  const { t, lang } = useLanguage()
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm">
      <span className="font-semibold text-foreground">{count}</span>
      <span className="text-muted-foreground">{t('pipeline.dealsSuffix')}:</span>
      <span className="font-semibold text-foreground">{formatMoney(value, 'USD', lang)}</span>
    </div>
  )
}
