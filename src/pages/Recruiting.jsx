import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Plus, Search } from 'lucide-react'
import { PageHeader, ConfirmDialog } from '@/components/shared'
import { Button, Input } from '@/components/ui'
import { CandidateColumn, CandidateCard, CandidateModal } from '@/components/recruiting'
import { useRecruitingPage, useLanguage } from '@/hooks'

export default function Recruiting() {
  const { t } = useLanguage()
  const {
    stages,
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
  } = useRecruitingPage()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={t('recruiting.title')}
        description={t('recruiting.description')}
        actions={
          <Button onClick={() => openCreate('applied')} className="gap-1.5">
            <Plus className="size-4" />
            {t('recruiting.newCandidate')}
          </Button>
        }
      />

      <div className="border-b bg-background px-4 py-3 sm:px-6">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('recruiting.searchPlaceholder')}
            className="h-9 pl-8"
          />
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
              <CandidateColumn
                key={stage.id}
                stage={stage}
                candidates={candidatesByStage[stage.id]}
                onEdit={openEdit}
                onDelete={setDeletingCandidate}
                onCreate={openCreate}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeCandidate && (
            <div className="w-72 rotate-2 sm:w-80">
              <CandidateCard candidate={activeCandidate} onEdit={() => {}} onDelete={() => {}} dragDisabled />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CandidateModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        candidate={editingCandidate}
        defaultStage={defaultStage}
        onSubmit={submitCandidate}
      />

      <ConfirmDialog
        open={Boolean(deletingCandidate)}
        onOpenChange={(open) => !open && setDeletingCandidate(null)}
        title={t('recruiting.deleteTitle')}
        description={`"${deletingCandidate?.name}" ${t('recruiting.deleteDescription')}`}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
