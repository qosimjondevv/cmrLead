import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { INITIAL_CALL_LEADS } from '@/constants'

export function useCallLeads() {
  const [leads, setLeads] = useLocalStorage('crm-call-leads', INITIAL_CALL_LEADS)

  const createLead = useCallback(
    (lead) => {
      const newLead = {
        id: `lead-${Date.now()}`,
        stage: 'unsorted',
        tags: [],
        createdAt: new Date().toISOString(),
        ...lead,
      }
      setLeads((prev) => [newLead, ...prev])
      return newLead
    },
    [setLeads]
  )

  const updateLead = useCallback(
    (id, patch) => {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
    },
    [setLeads]
  )

  const moveLead = useCallback(
    (id, stage) => {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)))
    },
    [setLeads]
  )

  const deleteLead = useCallback(
    (id) => {
      setLeads((prev) => prev.filter((l) => l.id !== id))
    },
    [setLeads]
  )

  return { leads, createLead, updateLead, moveLead, deleteLead }
}
