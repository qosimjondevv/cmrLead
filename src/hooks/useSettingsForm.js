import { useState } from 'react'
import { toast } from 'sonner'
import { useLanguage } from './useLanguage'

export function useSettingsForm() {
  const { t } = useLanguage()
  const [name, setName] = useState('Admin')
  const [email, setEmail] = useState('admin@crm.local')
  const [notifDeals, setNotifDeals] = useState(true)
  const [notifTasks, setNotifTasks] = useState(true)

  function handleSaveProfile(e) {
    e.preventDefault()
    toast.success(t('settings.profileUpdated'))
  }

  return {
    name,
    setName,
    email,
    setEmail,
    notifDeals,
    setNotifDeals,
    notifTasks,
    setNotifTasks,
    handleSaveProfile,
  }
}
