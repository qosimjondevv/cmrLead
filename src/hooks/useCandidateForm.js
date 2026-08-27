import { useState } from 'react'
import { useLanguage } from './useLanguage'

const EMPTY_FORM = { name: '', phone: '', position: '', stage: 'applied', note: '' }

export function useCandidateForm({ open, candidate, defaultStage, onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(candidate)

  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setForm(
        candidate
          ? {
              name: candidate.name ?? '',
              phone: candidate.phone ?? '',
              position: candidate.position ?? '',
              stage: candidate.stage ?? 'applied',
              note: candidate.note ?? '',
            }
          : { ...EMPTY_FORM, stage: defaultStage ?? 'applied' }
      )
      setErrors({})
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t('recruiting.nameRequired')
    if (!form.position.trim()) next.position = t('recruiting.positionRequired')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      position: form.position.trim(),
      stage: form.stage,
      note: form.note.trim(),
    })
  }

  return { form, updateField, errors, isEdit, handleSubmit }
}
