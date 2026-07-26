export function Logo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mikuGrad" x1="8" y1="4" x2="56" y2="60">
          <stop stopColor="#39b5cc" />
          <stop offset="1" stopColor="#1a8a9e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#mikuGrad)" />
      <path
        d="M18 38V22l8 12 8-12v16"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 28l6 6 10-12"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
