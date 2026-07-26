# MikuTodo

Smart task management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- Glassmorphism UI inspired by modern productivity dashboards
- Accent color `#39b5cc`
- Light & dark mode (persisted)
- Chinese / English i18n (persisted)
- Responsive layout for desktop, laptop, iPad, and mobile
- Task board, 3D document stack, smart detail panel, and project timeline
- Custom **MikuTodo** logo (checkmark + M mark in teal)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

Build for production:

```bash
npm run build
npm run preview
```

## Controls

| Control | Action |
|--------|--------|
| Sun / Moon | Toggle light / dark mode |
| 中 / EN | Switch Chinese / English |
| **New Task** | Add a task to the board |
| Task row | Select task & open smart details |
| **Complete Task** | Mark selected task done |

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- i18next / react-i18next
- Lucide icons
