import { useState } from 'react'
import { Menu, Sun, Moon, Layers } from 'lucide-react'
import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Sheet,
  SheetContent,
} from '@/components/ui'
import { SidebarNav } from './Sidebar'
import { GlobalSearch } from './GlobalSearch'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NotificationBell } from './NotificationBell'
import { AccountMenu } from './AccountMenu'
import { useTheme, useLanguage } from '@/hooks'

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <div className="sticky top-0 z-20 flex flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
    <header className="flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      <div className="flex items-center gap-2 md:hidden">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Layers className="size-4" />
        </div>
        <span className="text-sm font-semibold">{t('sidebar.brand')}</span>
      </div>

      <GlobalSearch className="ml-auto hidden max-w-sm flex-1 sm:block md:ml-4" />

      <div className="ml-auto flex items-center gap-1 sm:ml-2 sm:gap-1.5">
        <LanguageSwitcher />

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {theme === 'dark' ? t('header.lightMode') : t('header.darkMode')}
          </TooltipContent>
        </Tooltip>

        <NotificationBell />

        <AccountMenu />
      </div>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
          <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
            <div className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-white">
              <Layers className="size-4" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">{t('sidebar.brand')}</span>
          </div>
          <SidebarNav collapsed={false} onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>

    <div className="px-4 pb-3 sm:hidden">
      <GlobalSearch />
    </div>
    </div>
  )
}
