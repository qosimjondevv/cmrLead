import { Briefcase, Wallet, TrendingUp, Percent } from 'lucide-react'
import { PageHeader, StatCard, StageProgressList, ErrorState } from '@/components/shared'
import { WeeklyDealsChart, ResponsibleLeaderboard } from '@/components/analytics'
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@/components/ui'
import { useAnalyticsData, useLanguage } from '@/hooks'
import { formatMoney } from '@/utils'

export default function Analytics() {
  const { t, lang } = useLanguage()
  const { stats, funnel, maxFunnel, dailyCounts, maxDaily, leaderboard, loading, error, refetch } =
    useAnalyticsData()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader title={t('analytics.title')} description={t('analytics.description')} />

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-4 sm:px-6">
        {error && !loading ? (
          <ErrorState onRetry={refetch} />
        ) : loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={Briefcase} label={t('analytics.totalDeals')} value={stats.total} iconPosition="start" />
              <StatCard icon={Wallet} label={t('analytics.totalValue')} value={formatMoney(stats.totalValue, 'USD', lang)} iconPosition="start" />
              <StatCard icon={Percent} label={t('analytics.conversionRate')} value={`${stats.conversion}%`} iconPosition="start" />
              <StatCard icon={TrendingUp} label={t('analytics.averageDeal')} value={formatMoney(stats.avg, 'USD', lang)} iconPosition="start" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>{t('analytics.dealsCreatedLast7Days')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyDealsChart data={dailyCounts} maxValue={maxDaily} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('analytics.pipelineFunnel')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <StageProgressList items={funnel} maxValue={maxFunnel} />
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>{t('analytics.responsibleLeaderboard')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ResponsibleLeaderboard items={leaderboard} />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
