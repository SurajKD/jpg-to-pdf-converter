"use client"

import { useEffect, useState } from "react"

const DARK = "dark"
const LIGHT = "light"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(LIGHT)

  useEffect(() => {
    const persisted = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null
    const systemPrefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
    const initialTheme = persisted || (systemPrefersDark ? DARK : LIGHT)
    document.documentElement.dataset.theme = initialTheme
    document.documentElement.classList.toggle("dark", initialTheme === DARK)
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === DARK ? LIGHT : DARK
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.classList.toggle("dark", nextTheme === DARK)
    window.localStorage.setItem("theme", nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 md:ml-2"
      aria-label="Toggle dark mode"
    >
      {theme === DARK ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}
