import { cn } from '@/lib/utils'
import { STAGE_DOT_CLASS } from '@/utils'
import { useLanguage } from '@/hooks'

export function StageProgressList({ items, maxValue }) {
  const { t } = useLanguage()
  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div key={s.id}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">{t(`stages.${s.id}`)}</span>
            <span className="text-muted-foreground">{s.count}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn('h-full rounded-full transition-all', STAGE_DOT_CLASS[s.color])}
              style={{ width: `${(s.count / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
