export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
}

export const ROLE_OPTIONS = [
  { value: ROLES.ADMIN, labelKey: 'auth.roleAdmin' },
  { value: ROLES.EMPLOYEE, labelKey: 'auth.roleEmployee' },
]

export const DEMO_CREDENTIALS = {
  [ROLES.ADMIN]: { email: 'admin@crm.local', password: 'Admin123!' },
  [ROLES.EMPLOYEE]: { email: 'xodim@crm.local', password: 'Xodim123!' },
}
