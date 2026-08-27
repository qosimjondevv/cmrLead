import { useMemo } from 'react'
import { STAGES } from '@/constants'
import { useDeals } from './useDeals'
import { useTasks } from './useTasks'

export function useDashboardData() {
  const { deals, loading, error, refetch } = useDeals()
  const { tasks } = useTasks()

  const stats = useMemo(() => {
    const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0)
    const won = deals.filter((d) => d.stage === 'closed_won').length
    const conversion = deals.length ? Math.round((won / deals.length) * 100) : 0
    const pendingTasks = tasks.filter((task) => !task.done).length
    return { total: deals.length, totalValue, conversion, pendingTasks }
  }, [deals, tasks])

  const stageCounts = useMemo(() => {
    return STAGES.map((s) => ({ ...s, count: deals.filter((d) => d.stage === s.id).length }))
  }, [deals])

  const recentDeals = useMemo(
    () => [...deals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [deals]
  )

  const upcomingTasks = useMemo(
    () =>
      [...tasks]
        .filter((task) => !task.done)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5),
    [tasks]
  )

  const maxStageCount = Math.max(1, ...stageCounts.map((s) => s.count))

  return { stats, stageCounts, recentDeals, upcomingTasks, maxStageCount, loading, error, refetch }
}
