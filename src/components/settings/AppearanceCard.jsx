import { Sun, Moon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/hooks'

const THEME_OPTIONS = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
]

export function AppearanceCard({ theme, onThemeChange }) {
  const { t } = useLanguage()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.appearanceTitle')}</CardTitle>
        <CardDescription>{t('settings.appearanceDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onThemeChange(opt.value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-lg border-2 px-4 py-4 text-sm font-medium transition-colors',
                theme === opt.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              <opt.icon className="size-5" />
              {t(`settings.${opt.value}`)}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
