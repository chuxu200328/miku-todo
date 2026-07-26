import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const days = Array.from({ length: 16 }, (_, i) => 15 + i)

const bars = [
  {
    key: 'reqReview',
    start: 0,
    span: 4,
    color: 'bg-[var(--color-accent)]/70',
  },
  {
    key: 'interaction',
    start: 4,
    span: 5,
    color: 'bg-[#6366f1]/60',
  },
  {
    key: 'coreDev',
    start: 6,
    span: 7,
    color: 'bg-[var(--color-accent)]',
  },
  {
    key: 'testing',
    start: 11,
    span: 4,
    color: 'bg-[#a855f7]/55',
  },
]

export function Timeline() {
  const { t } = useTranslation()

  return (
    <div className="glass rounded-2xl p-3 sm:p-4 animate-float-in" style={{ animationDelay: '200ms' }}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[13px] font-medium text-primary">
            {t('timeline.title')}
          </h2>
          <button
            type="button"
            className="flex items-center gap-1 text-[11px] text-muted hover:text-primary"
          >
            2025{t('timeline.month') === 'Month' ? ' May' : '年5月'}
            <ChevronDown size={12} />
          </button>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted">
          <span className="px-2 py-0.5 rounded-md bg-[var(--bg-soft)]">{t('timeline.week')}</span>
          <span className="text-[var(--color-accent)]">{t('timeline.today')}</span>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin -mx-1 px-1">
        <div className="min-w-[640px]">
          {/* Day markers */}
          <div className="relative mb-2 ml-[100px] sm:ml-[120px]">
            <div className="flex justify-between text-[9px] text-muted px-1">
              {days.map((d) => (
                <span
                  key={d}
                  className={d === 24 ? 'text-[var(--color-accent)] font-semibold' : ''}
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="absolute top-full left-0 right-0 h-px bg-[var(--border)] mt-1" />
            {/* Today marker */}
            <div
              className="absolute top-5 bottom-0 w-px bg-[var(--color-accent)]/50"
              style={{ left: `${((24 - 15) / 15) * 100}%` }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {bars.map((bar) => (
              <div key={bar.key} className="flex items-center gap-2">
                <div className="w-[100px] sm:w-[120px] shrink-0 text-[10px] sm:text-[11px] text-secondary truncate pr-2">
                  {t(`timeline.${bar.key}`)}
                </div>
                <div className="flex-1 relative h-7">
                  <div
                    className={`absolute top-1 h-5 rounded-md ${bar.color} flex items-center px-2 text-[9px] text-white/90 font-medium truncate shadow-sm transition hover:brightness-110`}
                    style={{
                      left: `${(bar.start / 15) * 100}%`,
                      width: `${(bar.span / 15) * 100}%`,
                    }}
                  >
                    <span className="truncate hidden sm:inline">
                      {t(`timeline.${bar.key}`)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
