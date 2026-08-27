import { NavLink } from 'react-router-dom'
import { ChevronsLeft, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { useLanguage, useAuth, useNavBadges } from '@/hooks'

function NavItem({ item, collapsed, onNavigate, label, badgeCount }) {
  const content = (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          collapsed && 'justify-center px-2',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
        )
      }
    >
      <span className="relative shrink-0">
        <item.icon className="size-[18px]" strokeWidth={2} />
        {collapsed && badgeCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground">
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </span>
      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {badgeCount > 0 && (
            <span className="ml-auto shrink-0 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold leading-none text-destructive-foreground">
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </>
      )}
    </NavLink>
  )

  if (!collapsed) return content

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

export function SidebarNav({ collapsed, onNavigate }) {
  const { t } = useLanguage()
  const { isAdmin } = useAuth()
  const badges = useNavBadges()
  const items = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin)

  return (
    <nav className="flex flex-1 flex-col gap-1 px-2 py-3">
      {items.map((item) => (
        <NavItem
          key={item.to}
          item={item}
          collapsed={collapsed}
          onNavigate={onNavigate}
          label={t(item.labelKey)}
          badgeCount={item.badge ? (badges[item.badge] ?? 0) : 0}
        />
      ))}
    </nav>
  )
}

export function Sidebar({ collapsed, onToggle }) {
  const { t } = useLanguage()
  return (
    <aside
      className={cn(
        'sticky top-0 z-30 hidden h-svh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-in-out md:flex',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div
        className={cn(
          'flex h-14 items-center border-b border-sidebar-border px-4',
          collapsed && 'justify-center px-2'
        )}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-white">
            <Layers className="size-4" />
          </div>
          {!collapsed && (
            <span className="truncate text-sm font-semibold text-sidebar-foreground">
              {t('sidebar.brand')}
            </span>
          )}
        </div>
      </div>

      <SidebarNav collapsed={collapsed} />

      <div className="border-t border-sidebar-border p-2">
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
            collapsed && 'justify-center px-2'
          )}
        >
          <ChevronsLeft
            className={cn('size-[18px] shrink-0 transition-transform duration-200', collapsed && 'rotate-180')}
          />
          {!collapsed && <span>{t('sidebar.collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}
