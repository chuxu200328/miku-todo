import { useTranslation } from 'react-i18next'
import { ChevronDown, Filter, ArrowUpDown, LayoutGrid } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

const groups = [
  { key: 'requirements' as const, color: 'bg-[var(--color-accent)]' },
  { key: 'design' as const, color: 'bg-[#6366f1]' },
  { key: 'dev' as const, color: 'bg-[#a855f7]' },
]

export function TaskBoard() {
  const { t, i18n } = useTranslation()
  const { tasks, selectedId, setSelectedId, boardFilter, setBoardFilter } =
    useTasks()
  const isZh = i18n.language === 'zh'

  const filters = [
    { key: 'all' as const, label: t('board.all') },
    { key: 'mine' as const, label: t('board.mine') },
    { key: 'participating' as const, label: t('board.participating') },
  ]

  return (
    <div className="glass rounded-2xl p-3 sm:p-4 h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-[13px] font-medium text-primary">
          {t('board.title')}
        </h2>
        <div className="flex items-center gap-1">
          {[
            { icon: Filter, label: t('board.filter') },
            { icon: ArrowUpDown, label: t('board.sort') },
            { icon: LayoutGrid, label: t('board.view') },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-[var(--bg-hover)] transition"
              title={label}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setBoardFilter(key)}
            className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
              boardFilter === key
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-medium'
                : 'text-muted hover:bg-[var(--bg-soft)]'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-muted hover:bg-[var(--bg-soft)]"
        >
          {t('board.status')}
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-1">
        {groups.map(({ key, color }) => {
          const groupTasks = tasks.filter((task) => task.group === key)
          if (!groupTasks.length) return null
          return (
            <div key={key}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                <span className="text-[11px] font-medium text-secondary">
                  {t(`board.${key === 'requirements' ? 'requirements' : key === 'design' ? 'design' : 'dev'}`)}
                </span>
                <span className="text-[10px] text-muted">{groupTasks.length}</span>
              </div>
              <div className="space-y-1.5">
                {groupTasks.map((task) => {
                  const active = task.id === selectedId
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => setSelectedId(task.id)}
                      className={`w-full text-left rounded-xl px-3 py-2.5 transition border ${
                        active
                          ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10'
                          : 'border-transparent hover:bg-[var(--bg-soft)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[10px] text-muted mb-0.5 font-mono">
                            {task.id}
                          </div>
                          <div className="text-[12px] sm:text-[13px] text-primary truncate">
                            {isZh ? task.titleZh : task.titleEn}
                          </div>
                        </div>
                        <StatusBadge status={task.status} />
                      </div>
                      {task.time && (
                        <div className="mt-1 text-[10px] text-muted">
                          {task.time}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation()
  const map: Record<string, string> = {
    todo: 'bg-[var(--bg-soft)] text-muted',
    inProgress: 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]',
    done: 'bg-emerald-500/15 text-emerald-500',
    overdue: 'bg-[var(--color-danger)]/15 text-[var(--color-danger)]',
  }
  const label =
    status === 'inProgress'
      ? t('board.inProgress')
      : status === 'todo'
        ? t('board.pending')
        : t(`status.${status}`)

  return (
    <span
      className={`shrink-0 px-1.5 py-0.5 rounded-md text-[9px] font-medium ${map[status] ?? map.todo}`}
    >
      {label}
    </span>
  )
}
