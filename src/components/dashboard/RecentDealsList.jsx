import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Avatar,
  AvatarFallback,
} from '@/components/ui'
import { STAGES } from '@/constants'
import { STAGE_BADGE_VARIANT } from '@/utils'
import { useLanguage } from '@/hooks'

export function RecentDealsList({ deals }) {
  const { t } = useLanguage()
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t('dashboard.recentDeals')}</CardTitle>
        <Link to="/crm" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          {t('dashboard.viewPipeline')} <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {deals.length === 0 ? (
          <p className="px-4 pb-4 text-sm text-muted-foreground">{t('dashboard.noDealsYet')}</p>
        ) : (
          <div className="divide-y">
            {deals.map((d) => {
              const stage = STAGES.find((s) => s.id === d.stage)
              return (
                <div key={d.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback>{d.title?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{d.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.companyName}</p>
                  </div>
                  <Badge variant={STAGE_BADGE_VARIANT[stage?.color]} className="shrink-0">
                    {t(`stages.${d.stage}`)}
                  </Badge>
                  <span className="hidden w-24 shrink-0 text-right text-xs text-muted-foreground sm:block">
                    {d.ownerName}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
