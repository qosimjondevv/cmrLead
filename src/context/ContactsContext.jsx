import { useCallback, useEffect, useState } from 'react'
import { listContacts, createContact as apiCreateContact } from '@/api/crm'
import { mapApiContact } from '@/utils'
import { ContactsContext } from '@/hooks/useContacts'

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { contacts: raw } = await listContacts()
      setContacts(raw.map(mapApiContact))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContacts()
  }, [fetchContacts])

  const createContact = useCallback(async (payload) => {
    const raw = await apiCreateContact(payload)
    const contact = mapApiContact(raw)
    setContacts((prev) => [contact, ...prev])
    return contact
  }, [])

  // The sandbox CRM API has no PATCH/DELETE for contacts — apply edits/removal to the local view only.
  const updateContact = useCallback((id, patch) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }, [])

  const deleteContact = useCallback((id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return (
    <ContactsContext.Provider
      value={{ contacts, loading, error, createContact, updateContact, deleteContact, refetch: fetchContacts }}
    >
      {children}
    </ContactsContext.Provider>
  )
}
