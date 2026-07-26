import { useTranslation } from 'react-i18next'
import {
  CheckSquare,
  LayoutDashboard,
  FolderArchive,
  CalendarDays,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  Plus,
  X,
} from 'lucide-react'
import { Logo } from './Logo'

const navItems: {
  key: string
  icon: typeof CheckSquare
  active?: boolean
}[] = [
  { key: 'tasks', icon: CheckSquare, active: true },
  { key: 'overview', icon: LayoutDashboard },
  { key: 'files', icon: FolderArchive },
  { key: 'schedule', icon: CalendarDays },
  { key: 'team', icon: Users },
  { key: 'analytics', icon: BarChart3 },
  { key: 'knowledge', icon: BookOpen },
  { key: 'settings', icon: Settings },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTranslation()

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label={t('mobile.close')}
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex w-[240px] shrink-0 flex-col
          glass-panel border-r border-theme
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <Logo className="w-9 h-9 shrink-0 animate-pulse-glow rounded-2xl" />
            <div className="min-w-0">
              <div className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight text-primary truncate">
                {t('brand')}
              </div>
              <div className="text-[10px] text-muted truncate">{t('tagline')}</div>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-lg text-muted hover:bg-[var(--bg-hover)]"
            onClick={onClose}
            aria-label={t('mobile.close')}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
          {navItems.map(({ key, icon: Icon, active }) => (
            <button
              key={key}
              type="button"
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all
                ${
                  active
                    ? 'bg-[var(--bg-hover)] text-[var(--color-accent)] font-medium'
                    : 'text-secondary hover:bg-[var(--bg-soft)] hover:text-primary'
                }
              `}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                  active
                    ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                    : 'bg-[var(--bg-soft)]'
                }`}
              >
                <Icon size={15} />
              </span>
              <span className="flex-1 text-left">{t(`nav.${key}`)}</span>
              {active && (
                <span className="w-1 h-4 rounded-full bg-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-theme space-y-3">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>{t('workspace.title')}</span>
            <button
              type="button"
              className="p-1 rounded-md hover:bg-[var(--bg-hover)] text-[var(--color-accent)]"
              aria-label={t('workspace.add')}
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[var(--bg-soft)] border border-theme">
            <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center text-[11px] font-bold">
              P
            </div>
            <span className="text-[12px] text-primary truncate">
              {t('workspace.product')}
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-1 pt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#1a8a9e] flex items-center justify-center text-white text-[11px] font-semibold">
              BR
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-primary truncate">
                Brandon
              </div>
              <div className="text-[10px] text-muted truncate">Product PM</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
