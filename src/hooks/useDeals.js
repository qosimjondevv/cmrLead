import { createContext, useContext } from 'react'

export const DealsContext = createContext(null)

export function useDeals() {
  const ctx = useContext(DealsContext)
  if (!ctx) throw new Error('useDeals must be used within DealsProvider')
  return ctx
}
