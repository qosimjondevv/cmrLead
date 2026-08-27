import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeals } from './useDeals'
import { useContacts } from './useContacts'

export function useGlobalSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { deals } = useDeals()
  const { contacts } = useContacts()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { deals: [], contacts: [] }
    return {
      deals: deals.filter((d) => d.title?.toLowerCase().includes(q)).slice(0, 4),
      contacts: contacts.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4),
    }
  }, [query, deals, contacts])

  function updateQuery(value) {
    setQuery(value)
    setOpen(true)
  }

  function selectDeal() {
    navigate('/crm')
    setOpen(false)
    setQuery('')
  }

  function selectContact() {
    navigate('/contacts')
    setOpen(false)
    setQuery('')
  }

  return { query, updateQuery, open, setOpen, results, selectDeal, selectContact }
}
