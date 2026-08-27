import { useState } from 'react'
import { isValidPhone, isValidEmail } from '@/utils'
import { useLanguage } from './useLanguage'

const EMPTY_FORM = { name: '', position: '', phone: '', email: '', tags: '' }

export function useContactForm({ open, contact, onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const isEdit = Boolean(contact)

  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setForm(
        contact
          ? {
              name: contact.name ?? '',
              position: contact.title ?? '',
              phone: contact.phone ?? '',
              email: contact.email ?? '',
              tags: (contact.tags ?? []).join(', '),
            }
          : EMPTY_FORM
      )
      setErrors({})
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t('contactModal.nameRequired')
    if (!form.phone.trim()) next.phone = t('contactModal.phoneRequired')
    else if (!isValidPhone(form.phone)) next.phone = t('contactModal.invalidPhone')
    if (form.email.trim() && !isValidEmail(form.email)) next.email = t('contactModal.invalidEmail')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const [firstName, ...rest] = form.name.trim().split(' ')
      await onSubmit({
        firstName,
        lastName: rest.join(' ') || firstName,
        name: form.name.trim(),
        position: form.position.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return { form, updateField, errors, submitting, isEdit, handleSubmit }
}
