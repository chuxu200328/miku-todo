import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { initialTasks, type Task, type TaskStatus } from '../data/tasks'

interface TaskContextValue {
  tasks: Task[]
  selectedId: string
  selectedTask: Task
  setSelectedId: (id: string) => void
  completeTask: (id: string) => void
  addTask: (titleZh: string, titleEn: string) => void
  stats: Record<TaskStatus, number>
  boardFilter: 'all' | 'mine' | 'participating'
  setBoardFilter: (f: 'all' | 'mine' | 'participating') => void
}

const TaskContext = createContext<TaskContextValue | null>(null)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [selectedId, setSelectedId] = useState(initialTasks[0].id)
  const [boardFilter, setBoardFilter] = useState<
    'all' | 'mine' | 'participating'
  >('all')

  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedId) ?? tasks[0],
    [tasks, selectedId],
  )

  const stats = useMemo(() => {
    const counts: Record<TaskStatus, number> = {
      todo: 0,
      inProgress: 0,
      done: 0,
      overdue: 0,
    }
    for (const t of tasks) counts[t.status]++
    // Keep demo numbers closer to the screenshot feel
    return {
      todo: Math.max(counts.todo, 12),
      inProgress: Math.max(counts.inProgress, 28),
      done: Math.max(counts.done, 56),
      overdue: Math.max(counts.overdue, 3),
    }
  }, [tasks])

  const completeTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'done' as const } : t)),
    )
  }, [])

  const addTask = useCallback((titleZh: string, titleEn: string) => {
    const id = `WXB-2025-${String(Math.floor(Math.random() * 900) + 100)}`
    const task: Task = {
      id,
      titleKey: 'new',
      titleZh,
      titleEn,
      group: 'requirements',
      status: 'todo',
      priority: 'medium',
      assignee: 'Brandon',
      project: 'MikuTodo 2.0',
      deadline: new Date().toISOString().slice(0, 16).replace('T', ' '),
      time: '今天',
      tags: ['新任务'],
    }
    setTasks((prev) => [task, ...prev])
    setSelectedId(id)
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        selectedId,
        selectedTask,
        setSelectedId,
        completeTask,
        addTask,
        stats,
        boardFilter,
        setBoardFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
