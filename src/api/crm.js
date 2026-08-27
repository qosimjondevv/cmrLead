import { createApiClient } from './httpClient'

const client = createApiClient(import.meta.env.VITE_CRM_API_URL)

export async function listDeals(params = {}) {
  const res = await client.get('/deals', { per_page: 100, ...params })
  return { deals: res?.data ?? [], pagination: res?.pagination }
}

export async function createDeal(payload) {
  const res = await client.post('/deals', payload)
  return res?.data
}

export async function updateDeal(id, patch) {
  const res = await client.patch(`/deals/${id}`, patch)
  return res?.data
}

export async function listContacts(params = {}) {
  const res = await client.get('/contacts', { per_page: 100, ...params })
  return { contacts: res?.data ?? [], pagination: res?.pagination }
}

export async function createContact(payload) {
  const res = await client.post('/contacts', payload)
  return res?.data
}
