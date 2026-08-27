import { Layers, ShieldCheck, User } from 'lucide-react'
import { Button, Input, Label, Card, CardContent } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ROLES, DEMO_CREDENTIALS } from '@/constants'
import { useLoginForm, useLanguage } from '@/hooks'
import { LanguageSwitcher } from '@/components/layout'

const ROLE_OPTIONS = [
  { value: ROLES.EMPLOYEE, icon: User },
  { value: ROLES.ADMIN, icon: ShieldCheck },
]

export default function Login() {
  const { t } = useLanguage()
  const { email, setEmail, password, setPassword, role, selectRole, error, submitting, handleSubmit } =
    useLoginForm()

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Layers className="size-6" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">{t('sidebar.brand')}</h1>
          <p className="text-sm text-muted-foreground">{t('auth.subtitle')}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectRole(opt.value)}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors',
                      role === opt.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    )}
                  >
                    <opt.icon className="size-4" />
                    {t(`auth.role${opt.value === ROLES.ADMIN ? 'Admin' : 'Employee'}`)}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-email">{t('auth.emailLabel')}</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@crm.local"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password">{t('auth.passwordLabel')}</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? t('auth.loggingIn') : t('auth.loginBtn')}
              </Button>
            </form>

            <div className="mt-5 rounded-lg border border-dashed bg-muted/30 p-3">
              <p className="mb-2 text-xs font-medium text-foreground">{t('auth.demoCredentialsLabel')}</p>
              <div className="space-y-1.5 font-mono text-xs text-muted-foreground">
                <p>
                  <span className="text-foreground">{t('auth.roleAdmin')}:</span>{' '}
                  {DEMO_CREDENTIALS[ROLES.ADMIN].email} / {DEMO_CREDENTIALS[ROLES.ADMIN].password}
                </p>
                <p>
                  <span className="text-foreground">{t('auth.roleEmployee')}:</span>{' '}
                  {DEMO_CREDENTIALS[ROLES.EMPLOYEE].email} / {DEMO_CREDENTIALS[ROLES.EMPLOYEE].password}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
