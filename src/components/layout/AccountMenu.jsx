import { useNavigate } from 'react-router-dom'
import { ShieldCheck, User } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui'
import { initialsFromName } from '@/utils'
import { useAuth, useLanguage } from '@/hooks'

export function AccountMenu() {
  const { t } = useLanguage()
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="ml-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={t('header.accountMenu')}
        >
          <Avatar className="size-8">
            <AvatarFallback>{initialsFromName(user?.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
              <p className="truncate text-xs font-normal text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-xs font-normal text-muted-foreground">
            {isAdmin ? <ShieldCheck className="size-3" /> : <User className="size-3" />}
            {isAdmin ? t('auth.roleAdmin') : t('auth.roleEmployee')}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('header.profile')}</DropdownMenuItem>
        {isAdmin && <DropdownMenuItem>{t('header.settingsMenu')}</DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          {t('header.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
