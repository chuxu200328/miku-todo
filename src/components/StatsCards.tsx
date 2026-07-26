import { useTranslation } from 'react-i18next'
import { ClipboardList, Loader, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import type { TaskStatus } from '../data/tasks'

const cards: {
  key: TaskStatus
  icon: typeof ClipboardList
  delta: string
  danger?: boolean
}[] = [
  { key: 'todo', icon: ClipboardList, delta: '+20%' },
  { key: 'inProgress', icon: Loader, delta: '+8%' },
  { key: 'done', icon: CheckCircle2, delta: '+15%' },
  { key: 'overdue', icon: AlertCircle, delta: '-40%', danger: true },
]

export function StatsCards() {
  const { t } = useTranslation()
  const { stats } = useTasks()

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {cards.map(({ key, icon: Icon, delta, danger }, i) => (
        <div
          key={key}
          className="glass rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 animate-float-in"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs text-muted mb-1.5">
                {t(`stats.${key === 'todo' ? 'todo' : key === 'inProgress' ? 'inProgress' : key === 'done' ? 'done' : 'overdue'}`)}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold tracking-tight ${
                    danger ? 'text-[var(--color-danger)]' : 'text-primary'
                  }`}
                >
                  {stats[key]}
                </span>
                <span className="text-[11px] text-muted">{t('stats.tasks')}</span>
              </div>
              <div
                className={`mt-1.5 text-[10px] sm:text-[11px] ${
                  danger ? 'text-[var(--color-danger)]' : 'text-[var(--color-accent)]'
                }`}
              >
                {t('stats.vsYesterday')} {delta}
              </div>
            </div>
            <div
              className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0 ${
                danger
                  ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
                  : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
              }`}
            >
              <Icon size={18} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
