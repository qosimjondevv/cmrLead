import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { useLanguage } from './useLanguage'
import { ROLES, DEMO_CREDENTIALS } from '@/constants'

const DEFAULT_ROLE = ROLES.EMPLOYEE

export function useLoginForm() {
  const { t } = useLanguage()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(DEMO_CREDENTIALS[DEFAULT_ROLE].email)
  const [password, setPassword] = useState(DEMO_CREDENTIALS[DEFAULT_ROLE].password)
  const [role, setRole] = useState(DEFAULT_ROLE)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function selectRole(nextRole) {
    setRole(nextRole)
    setEmail(DEMO_CREDENTIALS[nextRole].email)
    setPassword(DEMO_CREDENTIALS[nextRole].password)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError(t('auth.fillAllFields'))
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await login({ email: email.trim(), password, role })
      const redirectTo = location.state?.from?.pathname ?? '/'
      navigate(redirectTo, { replace: true })
    } catch {
      setError(t('auth.loginFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  return { email, setEmail, password, setPassword, role, selectRole, error, submitting, handleSubmit }
}
