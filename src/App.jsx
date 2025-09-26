
import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import DashboardOverview from './components/pages/DashboardOverview'
import Employees from './components/pages/Employees'
import Leave from './components/pages/Leave'
import Payroll from './components/pages/Payroll'
import Notifications from './components/pages/Notifications'
import Settings from './components/pages/Settings'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardOverview />
      case 'employees':
        return <Employees />
      case 'leave':
        return <Leave />
      case 'payroll':
        return <Payroll />
      case 'notifications':
        return <Notifications />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <>
      <Header activeTab={activeTab} onNavigate={setActiveTab} />
      {renderPage()}
    </>
  )
}

export default App
