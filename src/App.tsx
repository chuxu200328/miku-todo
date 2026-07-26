import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PanelRight } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { StatsCards } from './components/StatsCards'
import { TaskBoard } from './components/TaskBoard'
import { CardStack } from './components/CardStack'
import { DetailPanel } from './components/DetailPanel'
import { Timeline } from './components/Timeline'

export default function App() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  return (
    <div className="app-bg flex h-full min-h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 min-w-0 flex-col">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="flex h-full min-h-0">
            <div className="flex-1 min-w-0 p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
              <StatsCards />

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,320px)_1fr] gap-3 sm:gap-4 min-h-[320px] lg:min-h-[360px]">
                <div className="min-h-[280px] lg:min-h-0 lg:max-h-[420px]">
                  <TaskBoard />
                </div>
                <div className="min-h-[280px] lg:min-h-0 lg:max-h-[420px] relative">
                  <CardStack />
                  <button
                    type="button"
                    className="xl:hidden absolute bottom-3 right-3 z-20 flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[var(--color-accent)] text-white text-[12px] font-medium shadow-lg"
                    onClick={() => setDetailOpen(true)}
                  >
                    <PanelRight size={14} />
                    {t('mobile.details')}
                  </button>
                </div>
              </div>

              <Timeline />
            </div>

            <DetailPanel />
          </div>
        </main>
      </div>

      <DetailPanel
        mobile
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  )
}
