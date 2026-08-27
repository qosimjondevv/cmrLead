import { createContext, useContext } from 'react'

export const ContactsContext = createContext(null)

export function useContacts() {
  const ctx = useContext(ContactsContext)
  if (!ctx) throw new Error('useContacts must be used within ContactsProvider')
  return ctx
}
