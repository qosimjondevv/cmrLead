import { KanbanColumn } from '@/components/shared'
import { CandidateCard } from './CandidateCard'
import { useLanguage } from '@/hooks'

export function CandidateColumn({ stage, candidates, onEdit, onDelete, onCreate }) {
  const { t } = useLanguage()

  return (
    <KanbanColumn
      stageId={stage.id}
      stageColor={stage.color}
      title={t(`recruitingStages.${stage.id}`)}
      count={candidates.length}
      onCreate={() => onCreate(stage.id)}
      quickAddLabel={t('pipeline.quickAdd')}
      isEmpty={candidates.length === 0}
      emptyTitle={t('recruiting.noCandidates')}
      emptyDescription={t('recruiting.noCandidatesDescription')}
    >
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </KanbanColumn>
  )
}
