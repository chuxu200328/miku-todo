export type TaskStatus = 'todo' | 'inProgress' | 'done' | 'overdue'
export type Priority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  titleKey: string
  titleZh: string
  titleEn: string
  group: 'requirements' | 'design' | 'dev'
  status: TaskStatus
  priority: Priority
  assignee: string
  project: string
  deadline: string
  time: string
  tags: string[]
  progress?: number
}

export const initialTasks: Task[] = [
  {
    id: 'WXB-2025-001',
    titleKey: 'reqReview',
    titleZh: '需求评审会',
    titleEn: 'Requirements Review',
    group: 'requirements',
    status: 'inProgress',
    priority: 'high',
    assignee: 'Brandon',
    project: 'MikuTodo 2.0',
    deadline: '2025-05-24 18:00',
    time: '今天 10:00',
    tags: ['需求', '关键路径'],
    progress: 87,
  },
  {
    id: 'WXB-2025-002',
    titleKey: 'userResearch',
    titleZh: '用户调研分析',
    titleEn: 'User Research Analysis',
    group: 'requirements',
    status: 'todo',
    priority: 'medium',
    assignee: 'Alice',
    project: 'MikuTodo 2.0',
    deadline: '2025-05-26 14:00',
    time: '今天 14:00',
    tags: ['调研'],
  },
  {
    id: 'WXB-2025-003',
    titleKey: 'competitive',
    titleZh: '竞品功能梳理',
    titleEn: 'Competitor Feature Review',
    group: 'requirements',
    status: 'todo',
    priority: 'low',
    assignee: 'Chris',
    project: 'MikuTodo 2.0',
    deadline: '2025-05-28 09:30',
    time: '明天 09:30',
    tags: ['竞品'],
  },
  {
    id: 'WXB-2025-004',
    titleKey: 'interaction',
    titleZh: '交互流程设计',
    titleEn: 'Interaction Flow Design',
    group: 'design',
    status: 'inProgress',
    priority: 'high',
    assignee: 'Dana',
    project: 'MikuTodo 2.0',
    deadline: '2025-06-05 18:00',
    time: '',
    tags: ['设计'],
  },
  {
    id: 'WXB-2025-005',
    titleKey: 'prototype',
    titleZh: '原型评审',
    titleEn: 'Prototype Review',
    group: 'design',
    status: 'inProgress',
    priority: 'medium',
    assignee: 'Eva',
    project: 'MikuTodo 2.0',
    deadline: '2025-06-08 12:00',
    time: '',
    tags: ['原型'],
  },
  {
    id: 'WXB-2025-006',
    titleKey: 'api',
    titleZh: 'API 接口开发',
    titleEn: 'API Development',
    group: 'dev',
    status: 'todo',
    priority: 'high',
    assignee: 'Frank',
    project: 'MikuTodo 2.0',
    deadline: '2025-06-15 18:00',
    time: '',
    tags: ['开发'],
  },
  {
    id: 'WXB-2025-007',
    titleKey: 'auth',
    titleZh: '登录鉴权模块',
    titleEn: 'Auth Module',
    group: 'dev',
    status: 'overdue',
    priority: 'high',
    assignee: 'Grace',
    project: 'MikuTodo 2.0',
    deadline: '2025-05-20 18:00',
    time: '',
    tags: ['安全'],
  },
  {
    id: 'WXB-2025-008',
    titleKey: 'i18n',
    titleZh: '多语言适配',
    titleEn: 'i18n Adaptation',
    group: 'dev',
    status: 'done',
    priority: 'medium',
    assignee: 'Brandon',
    project: 'MikuTodo 2.0',
    deadline: '2025-05-18 18:00',
    time: '',
    tags: ['i18n'],
  },
]

export const stackCards = [
  { id: 1, labelKey: 'reqReview', accent: false },
  { id: 2, labelKey: 'prototype', accent: false },
  { id: 3, labelKey: 'dev', accent: true },
  { id: 4, labelKey: 'whitepaper', accent: false },
  { id: 5, labelKey: 'projectDocs', accent: false },
]
