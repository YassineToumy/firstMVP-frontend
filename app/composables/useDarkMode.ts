export function useDarkMode() {
  const isDark = useState('dark_mode', () => false)

  function apply(dark: boolean) {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    apply(isDark.value)
    if (import.meta.client) {
      localStorage.setItem('dark_mode', isDark.value ? '1' : '0')
    }
  }

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem('dark_mode')
      if (saved === '1') {
        isDark.value = true
        apply(true)
      }
    }
  }

  return { isDark, toggle, init }
}
