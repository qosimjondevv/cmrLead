import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { cn } from '@/lib/utils'
import { LANGUAGE_OPTIONS } from '@/constants'
import { useLanguage } from '@/hooks'

export function LanguageCard({ lang, onLangChange }) {
  const { t } = useLanguage()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.language')}</CardTitle>
        <CardDescription>{t('settings.languageDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onLangChange(opt.value)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors',
                lang === opt.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
