import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Sparkles, X } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

interface DetailPanelProps {
  open?: boolean
  onClose?: () => void
  mobile?: boolean
}

export function DetailPanel({ open = true, onClose, mobile }: DetailPanelProps) {
  const { t, i18n } = useTranslation()
  const { selectedTask, completeTask } = useTasks()
  const isZh = i18n.language === 'zh'

  const priorityLabel =
    selectedTask.priority === 'high'
      ? t('detail.high')
      : selectedTask.priority === 'medium'
        ? t('detail.medium')
        : t('detail.low')

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <h2 className="text-[13px] font-medium text-primary">
            {t('detail.title')}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted hover:bg-[var(--bg-hover)]"
            aria-label={t('detail.search')}
          >
            <Search size={14} />
          </button>
          {mobile && onClose && (
            <button
              type="button"
              className="p-1.5 rounded-lg text-muted hover:bg-[var(--bg-hover)]"
              onClick={onClose}
              aria-label={t('mobile.close')}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-1">
        <div>
          <div className="text-[11px] font-mono text-muted mb-1">
            {selectedTask.id}
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-primary mb-2">
            {isZh ? selectedTask.titleZh : selectedTask.titleEn}
          </h3>
          <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--color-danger)]/15 text-[var(--color-danger)]">
            {priorityLabel}
          </span>
          <p className="mt-3 text-[12px] leading-relaxed text-secondary">
            {t('detail.description')}
          </p>
        </div>

        <dl className="space-y-2.5 text-[12px]">
          <Row label={t('detail.assignee')} value={selectedTask.assignee} avatar />
          <Row label={t('detail.project')} value={selectedTask.project} />
          <Row label={t('detail.deadline')} value={selectedTask.deadline} />
          <Row
            label={t('detail.status')}
            value={
              <span className="text-[var(--color-accent)]">
                {t(`status.${selectedTask.status}`)}
              </span>
            }
          />
          <Row
            label={t('detail.priority')}
            value={
              <span className="text-[var(--color-warning)]">
                {selectedTask.priority === 'high'
                  ? isZh
                    ? '高'
                    : 'High'
                  : selectedTask.priority === 'medium'
                    ? isZh
                      ? '中'
                      : 'Medium'
                    : isZh
                      ? '低'
                      : 'Low'}
              </span>
            }
          />
          <div className="flex items-start justify-between gap-3 py-1">
            <dt className="text-muted shrink-0">{t('detail.tags')}</dt>
            <dd className="flex flex-wrap gap-1 justify-end">
              {selectedTask.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] bg-[var(--bg-soft)] text-secondary border border-theme"
                >
                  {tag === '关键路径'
                    ? t('detail.criticalPath')
                    : tag === '需求'
                      ? t('detail.requirement')
                      : tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="rounded-xl border border-theme bg-[var(--bg-soft)] p-3.5 space-y-2.5">
          <div className="flex items-center gap-2 text-[12px] font-medium text-primary">
            <Sparkles size={14} className="text-[var(--color-accent)]" />
            {t('detail.aiTitle')}
          </div>
          <ul className="space-y-2 text-[11px] text-secondary">
            <li className="flex gap-2">
              <span className="text-[var(--color-accent)]">·</span>
              {t('detail.aiTip1')}
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-warning)]">·</span>
              {t('detail.aiTip2')}
            </li>
          </ul>
          <button
            type="button"
            className="text-[11px] text-[var(--color-accent)] hover:underline"
          >
            {t('detail.viewDetails')}
          </button>
        </div>
      </div>

      <div className="flex gap-2 pt-4 mt-auto border-t border-theme">
        <button
          type="button"
          className="flex-1 h-10 rounded-xl glass text-[12px] font-medium text-secondary hover:text-primary transition"
        >
          {t('detail.edit')}
        </button>
        <button
          type="button"
          onClick={() => completeTask(selectedTask.id)}
          className="flex-1 h-10 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] text-white text-[12px] font-medium shadow-[0_0_16px_var(--color-accent-glow)] transition"
        >
          {t('detail.complete')}
        </button>
      </div>
    </div>
  )

  if (mobile) {
    return (
      <>
        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 xl:hidden"
            aria-label={t('mobile.close')}
            onClick={onClose}
          />
        )}
        <aside
          className={`
            fixed inset-y-0 right-0 z-50 w-[min(100%,340px)]
            glass-panel border-l border-theme p-4
            transition-transform duration-300 ease-out xl:hidden
            ${open ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {content}
        </aside>
      </>
    )
  }

  return (
    <aside className="hidden xl:flex w-[300px] shrink-0 flex-col glass-panel border-l border-theme p-4">
      {content}
    </aside>
  )
}

function Row({
  label,
  value,
  avatar,
}: {
  label: string
  value: ReactNode
  avatar?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-0.5">
      <dt className="text-muted shrink-0">{label}</dt>
      <dd className="flex items-center gap-2 text-primary font-medium text-right">
        {avatar && (
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#1a8a9e] text-white text-[8px] flex items-center justify-center">
            B
          </span>
        )}
        {value}
      </dd>
    </div>
  )
}
