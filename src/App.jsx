import { Routes, Route } from 'react-router-dom'
import { AppLayout, ProtectedRoute } from '@/components/layout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Pipeline from '@/pages/Pipeline'
import Contacts from '@/pages/Contacts'
import Tasks from '@/pages/Tasks'
import CallCenter from '@/pages/CallCenter'
import Recruiting from '@/pages/Recruiting'
import Telegram from '@/pages/Telegram'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crm" element={<Pipeline />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/call-center" element={<CallCenter />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/telegram" element={<Telegram />} />
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
