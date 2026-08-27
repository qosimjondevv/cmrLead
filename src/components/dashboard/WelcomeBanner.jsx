import { useAuth, useLanguage } from '@/hooks'

export function WelcomeBanner() {
  const { t } = useLanguage()
  const { isAdmin } = useAuth()
  const roleLabel = t(isAdmin ? 'auth.roleAdmin' : 'auth.roleEmployee')
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary to-indigo-700 px-6 py-7 text-primary-foreground shadow-sm sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 20%, white 0%, transparent 45%), radial-gradient(circle at 15% 90%, white 0%, transparent 40%)',
        }}
      />
      <div className="relative">
        <p className="text-sm font-medium text-primary-foreground/80">{t('dashboard.greeting')}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{roleLabel}</h2>
        <p className="mt-1.5 text-sm text-primary-foreground/80">{t('dashboard.greetingSubtitle')}</p>
      </div>
    </div>
  )
}
