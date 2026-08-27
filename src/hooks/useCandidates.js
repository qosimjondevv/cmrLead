import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { INITIAL_CANDIDATES } from '@/constants'

export function useCandidates() {
  const [candidates, setCandidates] = useLocalStorage('crm-candidates', INITIAL_CANDIDATES)

  const createCandidate = useCallback(
    (candidate) => {
      const newCandidate = {
        id: `cand-${Date.now()}`,
        stage: 'applied',
        appliedAt: new Date().toISOString(),
        ...candidate,
      }
      setCandidates((prev) => [newCandidate, ...prev])
      return newCandidate
    },
    [setCandidates]
  )

  const updateCandidate = useCallback(
    (id, patch) => {
      setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
    },
    [setCandidates]
  )

  const moveCandidate = useCallback(
    (id, stage) => {
      setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, stage } : c)))
    },
    [setCandidates]
  )

  const deleteCandidate = useCallback(
    (id) => {
      setCandidates((prev) => prev.filter((c) => c.id !== id))
    },
    [setCandidates]
  )

  return { candidates, createCandidate, updateCandidate, moveCandidate, deleteCandidate }
}
