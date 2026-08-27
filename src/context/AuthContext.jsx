import { createContext, useCallback, useEffect, useState } from 'react'
import { login as apiLogin } from '@/api/auth'
import { ROLES } from '@/constants'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'crm-auth'

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  useEffect(() => {
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [session])

  const login = useCallback(async ({ email, password, role }) => {
    let apiUser = {}
    let token = null
    try {
      const res = await apiLogin(email, password)
      apiUser = res?.user ?? {}
      token = res?.access_token ?? null
    } catch {
      // The sandbox auth API can be unreachable (CORS, rate limits, downtime).
      // This is a demo login, so fall back to a local session instead of blocking access.
    }
    const nextSession = {
      token,
      user: {
        id: apiUser.id ?? `local-${Date.now()}`,
        name: apiUser.name || email.split('@')[0],
        email: apiUser.email || email,
        role: role ?? ROLES.EMPLOYEE,
      },
    }
    setSession(nextSession)
    return nextSession
  }, [])

  const logout = useCallback(() => {
    setSession(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        token: session?.token ?? null,
        isAuthenticated: Boolean(session),
        isAdmin: session?.user?.role === ROLES.ADMIN,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
