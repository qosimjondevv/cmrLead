import { useState } from 'react'
import { USERS } from '@/constants'
import { useLanguage } from './useLanguage'

const EMPTY_FORM = {
  name: '',
  phone: '',
  source: 'call',
  agentId: USERS[0].id,
  stage: 'unsorted',
  status: 'answered',
  lastMessage: '',
}

export function useCallLeadForm({ open, lead, defaultStage, onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const isEdit = Boolean(lead)

  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setForm(
        lead
          ? {
              name: lead.name ?? '',
              phone: lead.phone ?? '',
              source: lead.source ?? 'call',
              agentId: lead.agentId ?? USERS[0].id,
              stage: lead.stage ?? 'unsorted',
              status: lead.status ?? 'answered',
              lastMessage: lead.lastMessage ?? '',
            }
          : { ...EMPTY_FORM, stage: defaultStage ?? 'unsorted' }
      )
      setErrors({})
    }
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t('callCenter.nameRequired')
    if (!form.phone.trim()) next.phone = t('callCenter.phoneRequired')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      source: form.source,
      agentId: form.agentId,
      stage: form.stage,
      status: form.source === 'call' ? form.status : null,
      lastMessage: form.lastMessage.trim(),
      tags: lead?.tags ?? [],
    })
  }

  return { form, updateField, errors, isEdit, handleSubmit }
}
