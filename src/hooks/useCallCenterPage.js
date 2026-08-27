import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { CALL_CENTER_STAGES } from '@/constants'
import { groupDealsByStage } from '@/utils'
import { useCallLeads } from './useCallLeads'
import { useLanguage } from './useLanguage'
import { useKanbanSensors } from './useKanbanSensors'

export function useCallCenterPage() {
  const { t } = useLanguage()
  const { leads, createLead, updateLead, moveLead, deleteLead } = useCallLeads()
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState(null)
  const [defaultStage, setDefaultStage] = useState('unsorted')
  const [deletingLead, setDeletingLead] = useState(null)

  const sensors = useKanbanSensors()

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return leads
    return leads.filter(
      (l) => l.name.toLowerCase().includes(q) || l.phone.toLowerCase().includes(q)
    )
  }, [leads, search])

  const leadsByStage = useMemo(() => groupDealsByStage(filtered, CALL_CENTER_STAGES), [filtered])

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const lead = leads.find((l) => l.id === active.id)
    if (!lead || lead.stage === over.id) return
    moveLead(active.id, over.id)
    toast.success(`${t('callCenter.movedTo')} ${t(`callCenterStages.${over.id}`)}`)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function openCreate(stage = 'unsorted') {
    setEditingLead(null)
    setDefaultStage(stage)
    setModalOpen(true)
  }

  function openEdit(lead) {
    setEditingLead(lead)
    setModalOpen(true)
  }

  function submitLead(values) {
    if (editingLead) {
      updateLead(editingLead.id, values)
      toast.success(t('callCenter.leadUpdated'))
    } else {
      createLead(values)
      toast.success(t('callCenter.leadCreated'))
    }
    setModalOpen(false)
  }

  function confirmDelete() {
    if (!deletingLead) return
    deleteLead(deletingLead.id)
    toast.success(t('callCenter.leadDeleted'))
    setDeletingLead(null)
  }

  return {
    stages: CALL_CENTER_STAGES,
    leadsByStage,
    totalCount: filtered.length,
    unsortedCount: leads.filter((l) => l.stage === 'unsorted').length,
    activeLead,
    sensors,
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    editingLead,
    defaultStage,
    deletingLead,
    setDeletingLead,
    openCreate,
    openEdit,
    submitLead,
    confirmDelete,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
