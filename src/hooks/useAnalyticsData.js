import { useMemo } from 'react'
import { STAGES } from '@/constants'
import { useDeals } from './useDeals'
import { useLanguage } from './useLanguage'
import { initialsFromName } from '@/utils'

function last7Days() {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })
}

export function useAnalyticsData() {
  const { deals, loading, error, refetch } = useDeals()
  const { t } = useLanguage()
  const weekdays = t('analytics.weekdays')

  const stats = useMemo(() => {
    const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0)
    const won = deals.filter((d) => d.stage === 'closed_won').length
    const conversion = deals.length ? Math.round((won / deals.length) * 100) : 0
    const avg = deals.length ? Math.round(totalValue / deals.length) : 0
    return { total: deals.length, totalValue, conversion, avg }
  }, [deals])

  const funnel = useMemo(
    () => STAGES.map((s) => ({ ...s, count: deals.filter((d) => d.stage === s.id).length })),
    [deals]
  )
  const maxFunnel = Math.max(1, ...funnel.map((s) => s.count))

  const days = useMemo(() => last7Days(), [])
  const dailyCounts = useMemo(() => {
    return days.map((day) => {
      const key = day.toDateString()
      const count = deals.filter((d) => new Date(d.createdAt).toDateString() === key).length
      return { label: weekdays[day.getDay()], count }
    })
  }, [days, deals, weekdays])
  const maxDaily = Math.max(1, ...dailyCounts.map((d) => d.count))

  const leaderboard = useMemo(() => {
    const byOwner = new Map()
    for (const deal of deals) {
      if (!deal.ownerName) continue
      const entry = byOwner.get(deal.ownerName) ?? { name: deal.ownerName, count: 0, value: 0 }
      entry.count += 1
      entry.value += deal.value || 0
      byOwner.set(deal.ownerName, entry)
    }
    return [...byOwner.values()]
      .map((entry) => ({ ...entry, initials: initialsFromName(entry.name) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [deals])

  return { stats, funnel, maxFunnel, dailyCounts, maxDaily, leaderboard, loading, error, refetch }
}
