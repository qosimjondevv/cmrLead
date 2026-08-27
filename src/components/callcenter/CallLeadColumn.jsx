import { KanbanColumn } from '@/components/shared'
import { CallLeadCard } from './CallLeadCard'
import { useLanguage } from '@/hooks'

export function CallLeadColumn({ stage, leads, onEdit, onDelete, onCreate }) {
  const { t } = useLanguage()

  return (
    <KanbanColumn
      stageId={stage.id}
      stageColor={stage.color}
      title={t(`callCenterStages.${stage.id}`)}
      count={leads.length}
      onCreate={() => onCreate(stage.id)}
      quickAddLabel={t('pipeline.quickAdd')}
      isEmpty={leads.length === 0}
      emptyTitle={t('callCenter.noLeads')}
      emptyDescription={t('callCenter.noLeadsDescription')}
    >
      {leads.map((lead) => (
        <CallLeadCard key={lead.id} lead={lead} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </KanbanColumn>
  )
}
