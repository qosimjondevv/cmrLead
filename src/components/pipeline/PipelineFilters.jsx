import { Search, SlidersHorizontal, X } from 'lucide-react'
import {
  Input,
  Button,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Label,
} from '@/components/ui'
import { PipelineSummary } from './PipelineSummary'
import { useLanguage } from '@/hooks'

function ResponsibleField({ value, onChange, owners }) {
  const { t } = useLanguage()
  return (
    <div className="space-y-1.5">
      <Label>{t('pipeline.responsibleLabel')}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={t('common.all')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('common.all')}</SelectItem>
          {owners.map((owner) => (
            <SelectItem key={owner} value={owner}>
              {owner}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function PipelineFilters({ search, onSearchChange, responsible, onResponsibleChange, owners, summary }) {
  const { t } = useLanguage()
  const activeFilters = []
  if (responsible !== 'all') {
    activeFilters.push({
      key: 'responsible',
      label: `${t('pipeline.responsibleLabel')}: ${responsible}`,
      clear: () => onResponsibleChange('all'),
    })
  }

  return (
    <div className="flex flex-col gap-2.5 border-b bg-background px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('pipeline.searchPlaceholder')}
            className="h-9 pl-8"
          />
        </div>

        <div className="hidden sm:block sm:w-52">
          <Select value={responsible} onValueChange={onResponsibleChange}>
            <SelectTrigger>
              <SelectValue placeholder={t('pipeline.responsibleLabel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('pipeline.allResponsible')}</SelectItem>
              {owners.map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 sm:hidden">
              <SlidersHorizontal className="size-4" />
              {t('common.filters')}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>{t('common.filters')}</SheetTitle>
            </SheetHeader>
            <div className="px-4 py-4">
              <ResponsibleField value={responsible} onChange={onResponsibleChange} owners={owners} />
            </div>
          </SheetContent>
        </Sheet>

        {summary && (
          <div className="ml-auto hidden sm:block">
            <PipelineSummary count={summary.count} value={summary.value} />
          </div>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.map((f) => (
            <Badge key={f.key} variant="secondary" className="gap-1 pr-1">
              {f.label}
              <button
                type="button"
                onClick={f.clear}
                className="rounded-sm p-0.5 hover:bg-background/60"
                aria-label={`Clear ${f.label}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
