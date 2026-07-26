import { useTranslation } from 'react-i18next'
import { FileText } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { stackCards } from '../data/tasks'

export function CardStack() {
  const { t, i18n } = useTranslation()
  const { selectedTask } = useTasks()
  const isZh = i18n.language === 'zh'
  const progress = selectedTask.progress ?? 64

  // Fan layout angles matching the screenshot
  const angles = [-28, -14, 0, 14, 28, 40, 52]
  const cards = [...stackCards, ...stackCards.slice(0, 2)].slice(0, 7)

  return (
    <div className="glass rounded-2xl p-4 sm:p-6 h-full flex flex-col relative overflow-hidden min-h-[280px] sm:min-h-[320px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: 'var(--glow)' }}
      />

      {/* Floating featured card */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 animate-float-in">
        <div className="glass-panel rounded-xl px-3.5 py-3 w-[150px] sm:w-[170px] border border-[var(--border-strong)] shadow-lg">
          <div className="text-[10px] text-muted mb-1">
            {t('stack.projectDocs')}
          </div>
          <div className="text-[12px] font-medium text-primary mb-2 truncate">
            {isZh ? selectedTask.titleZh : selectedTask.titleEn}
          </div>
          <div className="text-[10px] text-muted mb-1">
            {selectedTask.deadline.slice(0, 7).replace('-', '-')}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-accent)]">
                {progress}%
              </span>
              <div className="text-[9px] text-muted">{t('stack.completion')}</div>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)]/30 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-[var(--border)]"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeDasharray={`${(progress / 100) * 88} 88`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3D fan of cards */}
      <div
        className="flex-1 flex items-center justify-center perspective-[900px] relative mt-8 sm:mt-4"
        style={{ perspective: '900px' }}
      >
        <div
          className="relative w-full max-w-[420px] h-[200px] sm:h-[240px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {cards.map((card, i) => {
            const angle = angles[i] ?? i * 12
            const isAccent = card.accent || i === 2
            return (
              <div
                key={`${card.id}-${i}`}
                className={`fan-card absolute left-1/2 top-1/2 w-[110px] sm:w-[130px] h-[150px] sm:h-[180px] rounded-xl border overflow-hidden animate-card-fan cursor-pointer ${
                  isAccent
                    ? 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/90 shadow-[0_0_40px_var(--color-accent-glow)]'
                    : 'border-[var(--border-strong)] glass-panel'
                }`}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${Math.abs(angle) * -1.2}px) translateX(${angle * 2.2}px)`,
                  zIndex: isAccent ? 10 : 7 - Math.abs(i - 2),
                  animationDelay: `${i * 70}ms`,
                }}
              >
                <div
                  className={`p-3 h-full flex flex-col ${isAccent ? 'text-white' : ''}`}
                >
                  <FileText
                    size={16}
                    className={isAccent ? 'text-white/80' : 'text-muted'}
                  />
                  <div className="mt-auto space-y-1.5">
                    {[0.9, 0.7, 0.85, 0.55].map((w, li) => (
                      <div
                        key={li}
                        className={`h-1 rounded-full ${
                          isAccent ? 'bg-white/30' : 'bg-[var(--border-strong)]'
                        }`}
                        style={{ width: `${w * 100}%` }}
                      />
                    ))}
                    <div
                      className={`text-[10px] mt-2 font-medium truncate ${
                        isAccent ? 'text-white' : 'text-secondary'
                      }`}
                    >
                      {t(`stack.${card.labelKey}`)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
