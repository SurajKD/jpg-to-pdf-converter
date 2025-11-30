export function trackEvent(name: string, payload?: Record<string, any>) {
  // implement opt-in analytics here. By default, do nothing to respect privacy.
  if (typeof window === 'undefined') return
  try {
    // window.gtag? etc. Placeholder.
    console.debug('trackEvent', name, payload)
  } catch {}
}
