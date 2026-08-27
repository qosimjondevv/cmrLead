import { Briefcase, Wallet, CheckSquare, TrendingUp } from 'lucide-react'
import { PageHeader, StatCard, StageProgressList, ErrorState } from '@/components/shared'
import { WelcomeBanner, RecentDealsList, UpcomingTasksList } from '@/components/dashboard'
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@/components/ui'
import { useDashboardData, useLanguage } from '@/hooks'
import { formatMoney } from '@/utils'

export default function Dashboard() {
  const { t, lang } = useLanguage()
  const { stats, stageCounts, recentDeals, upcomingTasks, maxStageCount, loading, error, refetch } =
    useDashboardData()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader title={t('dashboard.title')} description={t('dashboard.description')} />

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-4 sm:px-6">
        <WelcomeBanner />

        {error && !loading ? (
          <ErrorState onRetry={refetch} />
        ) : loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={Briefcase} label={t('dashboard.totalDeals')} value={stats.total} hint={t('dashboard.totalDealsHint')} />
              <StatCard icon={Wallet} label={t('dashboard.pipelineValue')} value={formatMoney(stats.totalValue, 'USD', lang)} />
              <StatCard icon={TrendingUp} label={t('dashboard.conversion')} value={`${stats.conversion}%`} hint={t('dashboard.conversionHint')} />
              <StatCard icon={CheckSquare} label={t('dashboard.pendingTasks')} value={stats.pendingTasks} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
              <RecentDealsList deals={recentDeals} />

              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.pipelineOverview')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <StageProgressList items={stageCounts} maxValue={maxStageCount} />
                </CardContent>
              </Card>
            </div>

            <UpcomingTasksList tasks={upcomingTasks} />
          </>
        )}
      </div>
    </div>
  )
}
