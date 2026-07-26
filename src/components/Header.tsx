import { useTranslation } from 'react-i18next'
import {
  Bell,
  MessageSquare,
  Plus,
  Search,
  Menu,
  Sun,
  Moon,
  Languages,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useTasks } from '../context/TaskContext'

interface HeaderProps {
  onMenuOpen: () => void
}

export function Header({ onMenuOpen }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { addTask } = useTasks()

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(next)
    localStorage.setItem('mikutodo-lang', next)
  }

  const handleNewTask = () => {
    const isZh = i18n.language === 'zh'
    const title = isZh ? '新任务' : 'New Task'
    addTask(title, 'New Task')
  }

  return (
    <header className="flex flex-wrap items-center gap-3 px-4 sm:px-6 py-4 border-b border-theme shrink-0">
      <button
        type="button"
        className="lg:hidden p-2 rounded-xl glass text-secondary hover:text-primary"
        onClick={onMenuOpen}
        aria-label={t('mobile.menu')}
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0 flex-1 basis-[160px]">
        <h1 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold tracking-tight text-primary truncate">
          {t('header.title')}
        </h1>
        <p className="text-[11px] sm:text-xs text-muted truncate hidden sm:block">
          {t('header.subtitle')}
        </p>
      </div>

      <div className="relative order-last sm:order-none w-full sm:w-auto sm:flex-1 sm:max-w-md">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          placeholder={t('header.search')}
          className="w-full h-10 pl-10 pr-4 rounded-xl glass text-[13px] text-primary placeholder:text-muted outline-none focus:border-[var(--color-accent)]/40 focus:ring-2 focus:ring-[var(--color-accent)]/20 transition"
        />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
        <button
          type="button"
          onClick={toggleLang}
          className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl glass text-secondary hover:text-primary text-[12px] transition"
          title={i18n.language === 'zh' ? t('lang.en') : t('lang.zh')}
        >
          <Languages size={15} />
          <span className="hidden sm:inline font-medium">
            {i18n.language === 'zh' ? '中' : 'EN'}
          </span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-xl glass text-secondary hover:text-primary transition"
          aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          type="button"
          className="relative flex items-center justify-center w-9 h-9 rounded-xl glass text-secondary hover:text-primary transition"
          aria-label={t('header.notifications')}
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-danger)]" />
        </button>

        <button
          type="button"
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl glass text-secondary hover:text-primary transition"
          aria-label={t('header.messages')}
        >
          <MessageSquare size={15} />
        </button>

        <button
          type="button"
          onClick={handleNewTask}
          className="flex items-center gap-1.5 h-9 px-3 sm:px-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] text-white text-[12px] sm:text-[13px] font-medium shadow-[0_0_20px_var(--color-accent-glow)] transition"
        >
          <Plus size={15} />
          <span className="hidden xs:inline sm:inline">{t('header.newTask')}</span>
        </button>
      </div>
    </header>
  )
}
