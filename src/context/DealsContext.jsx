import { useCallback, useEffect, useState } from 'react'
import { listDeals, createDeal as apiCreateDeal, updateDeal as apiUpdateDeal } from '@/api/crm'
import { mapApiDeal } from '@/utils'
import { DealsContext } from '@/hooks/useDeals'

export function DealsProvider({ children }) {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDeals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { deals: raw } = await listDeals()
      setDeals(raw.map(mapApiDeal))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDeals()
  }, [fetchDeals])

  const createDeal = useCallback(async (payload) => {
    const raw = await apiCreateDeal(payload)
    const deal = mapApiDeal(raw)
    setDeals((prev) => [deal, ...prev])
    return deal
  }, [])

  const updateDeal = useCallback(async (id, patch) => {
    const raw = await apiUpdateDeal(id, patch)
    const deal = mapApiDeal(raw)
    setDeals((prev) => prev.map((d) => (d.id === id ? deal : d)))
    return deal
  }, [])

  const moveDeal = useCallback(async (id, stage) => {
    let previousStage
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          previousStage = d.stage
          return { ...d, stage }
        }
        return d
      })
    )
    try {
      await apiUpdateDeal(id, { stage })
    } catch (err) {
      setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, stage: previousStage } : d)))
      throw err
    }
  }, [])

  const deleteDeal = useCallback((id) => {
    // The sandbox CRM API has no delete endpoint — remove from the local view only.
    setDeals((prev) => prev.filter((d) => d.id !== id))
  }, [])

  return (
    <DealsContext.Provider
      value={{ deals, loading, error, createDeal, updateDeal, moveDeal, deleteDeal, refetch: fetchDeals }}
    >
      {children}
    </DealsContext.Provider>
  )
}
