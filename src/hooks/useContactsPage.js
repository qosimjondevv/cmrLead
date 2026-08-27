import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useContacts } from './useContacts'
import { useLanguage } from './useLanguage'

export function useContactsPage() {
  const { t } = useLanguage()
  const { contacts, loading, error, createContact, updateContact, deleteContact, refetch } = useContacts()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return contacts
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q)
    )
  }, [contacts, search])

  function openCreate() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(contact) {
    setEditing(contact)
    setModalOpen(true)
  }

  async function submitContact(payload) {
    if (editing) {
      updateContact(editing.id, {
        name: payload.name,
        title: payload.position,
        phone: payload.phone,
        email: payload.email,
        tags: payload.tags,
      })
      toast.success(t('contacts.contactUpdated'))
      setModalOpen(false)
      return
    }
    try {
      await createContact({
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        title: payload.position,
        tags: payload.tags,
      })
      toast.success(t('contacts.contactCreated'))
      setModalOpen(false)
    } catch {
      toast.error(t('common.actionFailed'))
    }
  }

  function confirmDelete() {
    if (!deleting) return
    deleteContact(deleting.id)
    toast.success(t('contacts.contactDeleted'))
    setDeleting(null)
  }

  return {
    search,
    setSearch,
    filtered,
    loading,
    error,
    refetch,
    modalOpen,
    setModalOpen,
    editing,
    openCreate,
    openEdit,
    submitContact,
    deleting,
    setDeleting,
    confirmDelete,
  }
}
