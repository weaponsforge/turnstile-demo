import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: any) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    }
  }
}

interface IUseTurnstile {
  siteKey: string
  onSuccess: (token: string) => void
}

const useTurnstile = (props: IUseTurnstile) => {
  const { siteKey, onSuccess } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    const loadWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          size: 'invisible',
          callback: (token: string) => {
            onSuccess(token)
          },
        })
      }
    }

    if (window.turnstile) {
      loadWidget()
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          loadWidget()
        }
      }, 200)
    }
  }, [siteKey, onSuccess])

  const execute = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
      window.turnstile.execute(widgetIdRef.current)
    }
  }

  return { containerRef, execute }
}

export default useTurnstile
