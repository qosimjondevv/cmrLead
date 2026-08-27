import { USERS } from '@/constants'

export function userById(id) {
  return USERS.find((u) => u.id === id)
}
