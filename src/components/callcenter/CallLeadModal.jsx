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
import { CALL_CENTER_STAGES, CALL_SOURCES, USERS } from '@/constants'
import { useLanguage, useCallLeadForm } from '@/hooks'

export function CallLeadModal({ open, onOpenChange, lead, defaultStage, onSubmit }) {
  const { t } = useLanguage()
  const { form, updateField, errors, isEdit, handleSubmit } = useCallLeadForm({
    open,
    lead,
    defaultStage,
    onSubmit,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? t('callCenter.editTitle') : t('callCenter.createTitle')}</DialogTitle>
            <DialogDescription>
              {isEdit ? t('callCenter.editDescription') : t('callCenter.createDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 px-6 py-5">
            <div className="space-y-1.5">
              <Label htmlFor="lead-name">{t('common.name')}</Label>
              <Input
                id="lead-name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ali Valiyev"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lead-phone">{t('common.phone')}</Label>
              <Input
                id="lead-phone"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+998 90 123 45 67"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="lead-source">{t('callCenter.sourceLabel')}</Label>
                <Select value={form.source} onValueChange={(v) => updateField('source', v)}>
                  <SelectTrigger id="lead-source">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CALL_SOURCES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {t(`callCenter.source.${s.id}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-agent">{t('callCenter.agentLabel')}</Label>
                <Select value={form.agentId} onValueChange={(v) => updateField('agentId', v)}>
                  <SelectTrigger id="lead-agent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {USERS.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="lead-stage">{t('common.stage')}</Label>
                <Select value={form.stage} onValueChange={(v) => updateField('stage', v)}>
                  <SelectTrigger id="lead-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CALL_CENTER_STAGES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {t(`callCenterStages.${s.id}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {form.source === 'call' && (
                <div className="space-y-1.5">
                  <Label htmlFor="lead-status">{t('callCenter.statusLabel')}</Label>
                  <Select value={form.status} onValueChange={(v) => updateField('status', v)}>
                    <SelectTrigger id="lead-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="answered">{t('callCenter.status.answered')}</SelectItem>
                      <SelectItem value="missed">{t('callCenter.status.missed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lead-message">{t('callCenter.messageLabel')}</Label>
              <Input
                id="lead-message"
                value={form.lastMessage}
                onChange={(e) => updateField('lastMessage', e.target.value)}
                placeholder={t('callCenter.messagePlaceholder')}
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
