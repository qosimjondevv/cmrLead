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
} from '@/components/ui'
import { useLanguage, useContactForm } from '@/hooks'

export function ContactModal({ open, onOpenChange, contact, onSubmit }) {
  const { t } = useLanguage()
  const { form, updateField, errors, submitting, isEdit, handleSubmit } = useContactForm({
    open,
    contact,
    onSubmit,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? t('contactModal.editTitle') : t('contactModal.createTitle')}</DialogTitle>
            <DialogDescription>
              {isEdit ? t('contactModal.editDescription') : t('contactModal.createDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 px-6 py-5">
            <div className="space-y-1.5">
              <Label htmlFor="c-name">{t('contactModal.nameLabel')}</Label>
              <Input
                id="c-name"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder={t('contactModal.namePlaceholder')}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-phone">{t('contactModal.phoneLabel')}</Label>
              <Input
                id="c-phone"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder={t('contactModal.phonePlaceholder')}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-email">{t('contactModal.emailLabel')}</Label>
              <Input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder={t('contactModal.emailPlaceholder')}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-position">{t('contactModal.positionLabel')}</Label>
              <Input
                id="c-position"
                value={form.position}
                onChange={(e) => updateField('position', e.target.value)}
                placeholder={t('contactModal.positionPlaceholder')}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-tags">{t('contactModal.tagsLabel')}</Label>
              <Input
                id="c-tags"
                value={form.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                placeholder={t('contactModal.tagsPlaceholder')}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? t('contactModal.saving') : isEdit ? t('contactModal.saveChanges') : t('contactModal.createBtn')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
