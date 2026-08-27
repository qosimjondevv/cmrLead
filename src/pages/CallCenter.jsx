 import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Plus, Search } from 'lucide-react'
import { PageHeader, ConfirmDialog } from '@/components/shared'
import { Button, Input } from '@/components/ui'
import { CallLeadColumn, CallLeadCard, CallLeadModal } from '@/components/callcenter'
import { useCallCenterPage, useLanguage } from '@/hooks'

export default function CallCenter() {
  const { t } = useLanguage()
  const {
    stages,
    leadsByStage,
    totalCount,
    unsortedCount,
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
  } = useCallCenterPage()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={t('callCenter.title')}
        description={t('callCenter.description')}
        actions={
          <Button onClick={() => openCreate('unsorted')} className="gap-1.5">
            <Plus className="size-4" />
            {t('callCenter.newLead')}
          </Button>
        }
      />

      <div className="flex items-center gap-3 border-b bg-background px-4 py-3 sm:px-6">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('callCenter.searchPlaceholder')}
            className="h-9 pl-8"
          />
        </div>
        <div className="ml-auto hidden items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm sm:flex">
          <span className="font-semibold text-foreground">{totalCount}</span>
          <span className="text-muted-foreground">{t('callCenter.totalLeads')}</span>
          {unsortedCount > 0 && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold text-destructive">{unsortedCount}</span>
              <span className="text-muted-foreground">{t('callCenterStages.unsorted').toLowerCase()}</span>
            </>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin px-4 py-4 sm:px-6">
          <div className="flex h-full items-start gap-4">
            {stages.map((stage) => (
              <CallLeadColumn
                key={stage.id}
                stage={stage}
                leads={leadsByStage[stage.id]}
                onEdit={openEdit}
                onDelete={setDeletingLead}
                onCreate={openCreate}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeLead && (
            <div className="w-72 rotate-2 sm:w-80">
              <CallLeadCard lead={activeLead} onEdit={() => {}} onDelete={() => {}} dragDisabled />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CallLeadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        lead={editingLead}
        defaultStage={defaultStage}
        onSubmit={submitLead}
      />

      <ConfirmDialog
        open={Boolean(deletingLead)}
        onOpenChange={(open) => !open && setDeletingLead(null)}
        title={t('callCenter.deleteTitle')}
        description={`"${deletingLead?.name}" ${t('callCenter.deleteDescription')}`}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
