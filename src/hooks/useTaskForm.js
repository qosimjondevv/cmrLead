import { useState } from 'react'
import { USERS } from '@/constants'
import { useLanguage } from './useLanguage'

function buildEmptyForm(defaultDueDate) {
  return { title: '', dealId: '', assignee: USERS[0].id, dueDate: defaultDueDate ?? '' }
}

export function useTaskForm({ open, defaultDueDate, onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(() => buildEmptyForm(defaultDueDate))
  const [error, setError] = useState('')

  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setForm(buildEmptyForm(defaultDueDate))
      setError('')
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError(t('tasks.titleRequired'))
      return
    }
    onSubmit({
      title: form.title.trim(),
      dealId: form.dealId || undefined,
      assignee: form.assignee,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : new Date().toISOString(),
    })
  }

  return { form, updateField, error, handleSubmit }
}
