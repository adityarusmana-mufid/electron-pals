/// <reference types="vite/client" />

interface Window {
  electronPals?: {
    pin: (pinned: boolean) => void
  }
}
