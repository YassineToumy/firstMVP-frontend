// composables/useAuth.ts

import { useApi } from "./useApi"

interface User {
  id: number
  name: string
  email: string
}

export function useAuth() {
  const { apiFetch } = useApi()
  const user = useState<User | null>('auth_user', () => null)
  const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 })

  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string) {
    const res = await apiFetch<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    token.value = res.token
    user.value = res.user
  }

  async function register(name: string, email: string, password: string, password_confirmation: string) {
    const res = await apiFetch<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: { name, email, password, password_confirmation },
    })
    token.value = res.token
    user.value = res.user
  }

  async function logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' })
    } catch {}
    token.value = null
    user.value = null
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const res = await apiFetch<{ data: User }>('/auth/user')
      user.value = res.data
    } catch {
      token.value = null
      user.value = null
    }
  }

  return { user, isLoggedIn, login, register, logout, fetchUser  }
}