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
import { RECRUITING_STAGES } from '@/constants'
import { useLanguage, useCandidateForm } from '@/hooks'

export function CandidateModal({ open, onOpenChange, candidate, defaultStage, onSubmit }) {
  const { t } = useLanguage()
  const { form, updateField, errors, isEdit, handleSubmit } = useCandidateForm({
    open,
    candidate,
    defaultStage,
    onSubmit,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? t('recruiting.editTitle') : t('recruiting.createTitle')}</DialogTitle>
            <DialogDescription>
              {isEdit ? t('recruiting.editDescription') : t('recruiting.createDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 px-6 py-5">
            <div className="space-y-1.5">
              <Label htmlFor="cand-name">{t('common.name')}</Label>
              <Input
                id="cand-name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ali Valiyev"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cand-position">{t('recruiting.positionLabel')}</Label>
              <Input
                id="cand-position"
                value={form.position}
                onChange={(e) => updateField('position', e.target.value)}
                placeholder="Frontend Developer"
                aria-invalid={Boolean(errors.position)}
              />
              {errors.position && <p className="text-xs text-destructive">{errors.position}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cand-phone">{t('common.phone')}</Label>
              <Input
                id="cand-phone"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+998 90 123 45 67"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cand-stage">{t('common.stage')}</Label>
              <Select value={form.stage} onValueChange={(v) => updateField('stage', v)}>
                <SelectTrigger id="cand-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RECRUITING_STAGES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {t(`recruitingStages.${s.id}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cand-note">{t('recruiting.noteLabel')}</Label>
              <Input
                id="cand-note"
                value={form.note}
                onChange={(e) => updateField('note', e.target.value)}
                placeholder={t('recruiting.notePlaceholder')}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{isEdit ? t('common.saveChanges') : t('common.create')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
