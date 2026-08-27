import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui'
import { STAGES } from '@/constants'
import { useLanguage, useDealForm } from '@/hooks'

export function DealModal({ open, onOpenChange, deal, defaultStage, contacts, onSubmit }) {
  const { t } = useLanguage()
  const { form, updateField, errors, submitting, isEdit, handleSubmit } = useDealForm({
    open,
    deal,
    defaultStage,
    contacts,
    onSubmit,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? t('dealModal.editTitle') : t('dealModal.createTitle')}</DialogTitle>
            <DialogDescription>
              {isEdit ? t('dealModal.editDescription') : t('dealModal.createDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 px-6 py-5">
            <div className="space-y-1.5">
              <Label htmlFor="deal-title">{t('dealModal.titleLabel')}</Label>
              <Input
                id="deal-title"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder={t('dealModal.titlePlaceholder')}
                aria-invalid={Boolean(errors.title)}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            {!isEdit && (
              <div className="space-y-1.5">
                <Label htmlFor="deal-contact">{t('dealModal.contactLabel')}</Label>
                <Select value={form.contactId} onValueChange={(v) => updateField('contactId', v)}>
                  <SelectTrigger id="deal-contact" aria-invalid={Boolean(errors.contactId)}>
                    <SelectValue placeholder={t('dealModal.contactPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                        {c.companyName ? ` — ${c.companyName}` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.contactId && <p className="text-xs text-destructive">{errors.contactId}</p>}
                {contacts.length === 0 && (
                  <p className="text-xs text-muted-foreground">{t('dealModal.noContactsHint')}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="deal-value">{t('dealModal.valueLabel')}</Label>
                <Input
                  id="deal-value"
                  inputMode="numeric"
                  value={form.value}
                  onChange={(e) => updateField('value', e.target.value)}
                  placeholder="15000"
                  aria-invalid={Boolean(errors.value)}
                />
                {errors.value && <p className="text-xs text-destructive">{errors.value}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="deal-stage">{t('dealModal.stageLabel')}</Label>
                <Select value={form.stage} onValueChange={(v) => updateField('stage', v)}>
                  <SelectTrigger id="deal-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {t(`stages.${s.id}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="deal-close-date">{t('dealModal.closeDateLabel')}</Label>
              <Input
                id="deal-close-date"
                type="date"
                value={form.closeDate}
                onChange={(e) => updateField('closeDate', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={submitting || (!isEdit && contacts.length === 0)}>
              {submitting ? t('dealModal.saving') : isEdit ? t('dealModal.saveChanges') : t('dealModal.createBtn')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
