import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { STAGES } from '@/constants'
import { groupDealsByStage, sumDealValues } from '@/utils'
import { useDeals } from './useDeals'
import { useContacts } from './useContacts'
import { useLanguage } from './useLanguage'
import { useKanbanSensors } from './useKanbanSensors'

export function usePipelinePage() {
  const { t } = useLanguage()
  const { deals, loading, error, createDeal, updateDeal, moveDeal, deleteDeal, refetch } = useDeals()
  const { contacts } = useContacts()
  const [search, setSearch] = useState('')
  const [responsible, setResponsible] = useState('all')
  const [activeId, setActiveId] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState(null)
  const [defaultStage, setDefaultStage] = useState('prospecting')
  const [deletingDeal, setDeletingDeal] = useState(null)

  const sensors = useKanbanSensors()

  const owners = useMemo(
    () => [...new Set(deals.map((d) => d.ownerName).filter(Boolean))].sort(),
    [deals]
  )

  const filteredDeals = useMemo(() => {
    const q = search.trim().toLowerCase()
    return deals.filter((d) => {
      const matchesSearch =
        !q ||
        d.title?.toLowerCase().includes(q) ||
        d.companyName?.toLowerCase().includes(q) ||
        d.contactName?.toLowerCase().includes(q)
      const matchesResponsible = responsible === 'all' || d.ownerName === responsible
      return matchesSearch && matchesResponsible
    })
  }, [deals, search, responsible])

  const dealsByStage = useMemo(() => groupDealsByStage(filteredDeals, STAGES), [filteredDeals])

  const summary = useMemo(
    () => ({ count: filteredDeals.length, value: sumDealValues(filteredDeals) }),
    [filteredDeals]
  )

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) : null

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  async function handleDragEnd(event) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const deal = deals.find((d) => d.id === active.id)
    if (!deal || deal.stage === over.id) return
    try {
      await moveDeal(active.id, over.id)
      toast.success(`${t('pipeline.dealMovedTo')} ${t(`stages.${over.id}`)}`)
    } catch {
      toast.error(t('common.actionFailed'))
    }
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function openCreate(stage = 'prospecting') {
    setEditingDeal(null)
    setDefaultStage(stage)
    setModalOpen(true)
  }

  function openEdit(deal) {
    setEditingDeal(deal)
    setModalOpen(true)
  }

  async function submitDeal(payload) {
    try {
      if (editingDeal) {
        await updateDeal(editingDeal.id, payload)
        toast.success(t('pipeline.dealUpdated'))
      } else {
        await createDeal(payload)
        toast.success(t('pipeline.dealCreated'))
      }
      setModalOpen(false)
    } catch {
      toast.error(t('common.actionFailed'))
    }
  }

  function confirmDelete() {
    if (!deletingDeal) return
    deleteDeal(deletingDeal.id)
    toast.success(t('pipeline.dealDeleted'))
    setDeletingDeal(null)
  }

  return {
    stages: STAGES,
    dealsByStage,
    summary,
    activeDeal,
    sensors,
    search,
    setSearch,
    responsible,
    setResponsible,
    owners,
    contacts,
    loading,
    error,
    refetch,
    modalOpen,
    setModalOpen,
    editingDeal,
    defaultStage,
    deletingDeal,
    setDeletingDeal,
    openCreate,
    openEdit,
    submitDeal,
    confirmDelete,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
