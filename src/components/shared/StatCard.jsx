import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui'

export function StatCard({ icon: Icon, label, value, hint, iconPosition = 'end', onClick, active }) {
  const iconBox = (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="size-[18px]" />
    </div>
  )

  return (
    <Card
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className={cn(
        onClick &&
          'cursor-pointer text-left transition-colors outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring',
        active && 'border-primary bg-primary/5 ring-1 ring-primary/30'
      )}
    >
      <CardContent
        className={cn(
          'flex gap-3 p-4',
          iconPosition === 'end' ? 'items-start justify-between' : 'items-center'
        )}
      >
        {iconPosition === 'start' && iconBox}
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p
            className={cn(
              'font-semibold tracking-tight text-foreground',
              iconPosition === 'end' ? 'mt-1.5 text-2xl' : 'mt-0.5 text-xl'
            )}
          >
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {iconPosition === 'end' && iconBox}
      </CardContent>
    </Card>
  )
}
