import { formatMoney, sumDealValues } from '@/utils'
import { KanbanColumn } from '@/components/shared'
import { DealCard } from './DealCard'
import { DealCardSkeleton } from './DealCardSkeleton'
import { useLanguage } from '@/hooks'

export function PipelineColumn({ stage, deals, loading, onEdit, onDelete, onCreate }) {
  const { t, lang } = useLanguage()
  const total = sumDealValues(deals)

  return (
    <KanbanColumn
      stageId={stage.id}
      stageColor={stage.color}
      title={t(`stages.${stage.id}`)}
      count={deals.length}
      onCreate={!loading ? () => onCreate(stage.id) : undefined}
      quickAddLabel={t('pipeline.quickAdd')}
      isEmpty={!loading && deals.length === 0}
      emptyTitle={t('pipeline.noDeals')}
      emptyDescription={t('pipeline.noDealsDescription')}
      footer={
        !loading && deals.length > 0 && (
          <p className="mt-1.5 px-1 text-xs text-muted-foreground">
            {t('pipeline.total')}:{' '}
            <span className="font-medium text-foreground">{formatMoney(total, 'USD', lang)}</span>
          </p>
        )
      }
    >
      {loading && Array.from({ length: 3 }).map((_, i) => <DealCardSkeleton key={i} />)}
      {!loading &&
        deals.map((deal) => <DealCard key={deal.id} deal={deal} onEdit={onEdit} onDelete={onDelete} />)}
    </KanbanColumn>
  )
}
