import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useLocalStorage } from '@/hooks'

export function AppLayout() {
  const [collapsed, setCollapsed] = useLocalStorage('crm-sidebar-collapsed', false)

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex min-h-svh min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
