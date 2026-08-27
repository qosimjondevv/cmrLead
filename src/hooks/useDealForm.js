import { useState } from 'react'
import { useLanguage } from './useLanguage'

const EMPTY_FORM = {
  title: '',
  contactId: '',
  value: '',
  stage: 'prospecting',
  closeDate: '',
}

export function useDealForm({ open, deal, defaultStage, contacts, onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const isEdit = Boolean(deal)

  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setForm(
        deal
          ? {
              title: deal.title ?? '',
              contactId: deal.contactId ?? '',
              value: deal.value != null ? String(deal.value) : '',
              stage: deal.stage ?? 'prospecting',
              closeDate: deal.closeDate ?? '',
            }
          : { ...EMPTY_FORM, stage: defaultStage ?? 'prospecting' }
      )
      setErrors({})
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.title.trim()) next.title = t('dealModal.titleRequired')
    if (!isEdit && !form.contactId) next.contactId = t('dealModal.contactRequired')
    if (form.value && Number.isNaN(Number(form.value))) next.value = t('dealModal.amountMustBeNumber')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      if (isEdit) {
        await onSubmit({
          title: form.title.trim(),
          value: form.value ? Number(form.value) : 0,
          stage: form.stage,
          close_date: form.closeDate || undefined,
        })
      } else {
        const contact = contacts.find((c) => c.id === form.contactId)
        await onSubmit({
          title: form.title.trim(),
          value: form.value ? Number(form.value) : 0,
          stage: form.stage,
          contact_id: form.contactId,
          company_id: contact?.companyId,
          close_date: form.closeDate || undefined,
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return { form, updateField, errors, submitting, isEdit, handleSubmit }
}
