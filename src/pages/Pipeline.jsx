import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { PageHeader, ErrorState, ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui'
import { PipelineFilters, PipelineColumn, DealCard, DealModal } from '@/components/pipeline'
import { usePipelinePage, useLanguage } from '@/hooks'

export default function Pipeline() {
  const { t } = useLanguage()
  const {
    stages,
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
  } = usePipelinePage()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={t('pipeline.title')}
        description={t('pipeline.description')}
        actions={
          <Button onClick={() => openCreate('prospecting')} className="gap-1.5">
            <Plus className="size-4" />
            {t('pipeline.newDeal')}
          </Button>
        }
      />

      <PipelineFilters
        search={search}
        onSearchChange={setSearch}
        responsible={responsible}
        onResponsibleChange={setResponsible}
        owners={owners}
        summary={summary}
      />

      {error && !loading ? (
        <ErrorState title={t('pipeline.loadError')} onRetry={refetch} />
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin px-4 py-4 sm:px-6">
            <div className="flex h-full items-start gap-4">
              {stages.map((stage) => (
                <PipelineColumn
                  key={stage.id}
                  stage={stage}
                  deals={dealsByStage[stage.id]}
                  loading={loading}
                  onEdit={openEdit}
                  onDelete={setDeletingDeal}
                  onCreate={openCreate}
                />
              ))}
            </div>
          </div>

          <DragOverlay>
            {activeDeal && (
              <div className="w-72 rotate-2 sm:w-80">
                <DealCard deal={activeDeal} onEdit={() => {}} onDelete={() => {}} dragDisabled />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}

      <DealModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        deal={editingDeal}
        defaultStage={defaultStage}
        contacts={contacts}
        onSubmit={submitDeal}
      />

      <ConfirmDialog
        open={Boolean(deletingDeal)}
        onOpenChange={(open) => !open && setDeletingDeal(null)}
        title={t('pipeline.deleteDealTitle')}
        description={`"${deletingDeal?.title}" ${t('pipeline.deleteDealDescription')}`}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
