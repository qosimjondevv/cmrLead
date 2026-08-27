const PHONE_REGEX = /^\+?[0-9\s-]{7,}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidPhone(value) {
  return PHONE_REGEX.test(value.trim())
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value.trim())
}
