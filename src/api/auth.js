import { createApiClient } from './httpClient'

const client = createApiClient(import.meta.env.VITE_AUTH_API_URL)

export async function login(email, password) {
  return client.post('/login', { email, password })
}
