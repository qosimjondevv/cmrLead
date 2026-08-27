import {
  LayoutDashboard,
  Kanban,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
  Phone,
  UserPlus,
  Send,
} from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.dashboard', icon: LayoutDashboard, end: true },
  { to: '/crm', labelKey: 'nav.crm', icon: Kanban },
  { to: '/contacts', labelKey: 'nav.contacts', icon: Users },
  { to: '/tasks', labelKey: 'nav.tasks', icon: CheckSquare, badge: 'tasks' },
  { to: '/call-center', labelKey: 'nav.callCenter', icon: Phone, badge: 'callCenter' },
  { to: '/recruiting', labelKey: 'nav.recruiting', icon: UserPlus },
  { to: '/telegram', labelKey: 'nav.telegram', icon: Send, badge: 'telegram' },
  { to: '/analytics', labelKey: 'nav.analytics', icon: BarChart3, adminOnly: true },
  { to: '/settings', labelKey: 'nav.settings', icon: Settings, adminOnly: true },
]
