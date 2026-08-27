import { Send, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import { useLanguage } from '@/hooks'

export function ConnectionStatusCard() {
  const { t } = useLanguage()
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#229ED9]/10 text-[#229ED9]">
          <Send className="size-[18px]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{t('telegram.botName')}</p>
          <p className="text-xs text-muted-foreground">{t('telegram.connected')}</p>
        </div>
        <CheckCircle2 className="size-4 shrink-0 text-success" />
      </CardContent>
    </Card>
  )
}
