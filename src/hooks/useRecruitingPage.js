import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { RECRUITING_STAGES } from '@/constants'
import { groupDealsByStage } from '@/utils'
import { useCandidates } from './useCandidates'
import { useLanguage } from './useLanguage'
import { useKanbanSensors } from './useKanbanSensors'

export function useRecruitingPage() {
  const { t } = useLanguage()
  const { candidates, createCandidate, updateCandidate, moveCandidate, deleteCandidate } = useCandidates()
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingCandidate, setEditingCandidate] = useState(null)
  const [defaultStage, setDefaultStage] = useState('applied')
  const [deletingCandidate, setDeletingCandidate] = useState(null)

  const sensors = useKanbanSensors()

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return candidates
    const digits = q.replace(/\D/g, '')
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.position?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        (digits && c.phone?.replace(/\D/g, '').includes(digits))
    )
  }, [candidates, search])

  const candidatesByStage = useMemo(
    () => groupDealsByStage(filtered, RECRUITING_STAGES),
    [filtered]
  )

  const activeCandidate = activeId ? candidates.find((c) => c.id === activeId) : null

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const candidate = candidates.find((c) => c.id === active.id)
    if (!candidate || candidate.stage === over.id) return
    moveCandidate(active.id, over.id)
    toast.success(`${t('recruiting.movedTo')} ${t(`recruitingStages.${over.id}`)}`)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function openCreate(stage = 'applied') {
    setEditingCandidate(null)
    setDefaultStage(stage)
    setModalOpen(true)
  }

  function openEdit(candidate) {
    setEditingCandidate(candidate)
    setModalOpen(true)
  }

  function submitCandidate(values) {
    if (editingCandidate) {
      updateCandidate(editingCandidate.id, values)
      toast.success(t('recruiting.candidateUpdated'))
    } else {
      createCandidate(values)
      toast.success(t('recruiting.candidateCreated'))
    }
    setModalOpen(false)
  }

  function confirmDelete() {
    if (!deletingCandidate) return
    deleteCandidate(deletingCandidate.id)
    toast.success(t('recruiting.candidateDeleted'))
    setDeletingCandidate(null)
  }

  return {
    stages: RECRUITING_STAGES,
    candidatesByStage,
    activeCandidate,
    sensors,
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    editingCandidate,
    defaultStage,
    deletingCandidate,
    setDeletingCandidate,
    openCreate,
    openEdit,
    submitCandidate,
    confirmDelete,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
