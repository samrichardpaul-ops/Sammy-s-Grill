'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
  isAuthOpen: boolean
  openAuth: (afterLoginCallback?: () => void) => void
  closeAuth: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const afterLoginRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sg_user')
      if (stored) setUser(JSON.parse(stored))
    } catch {
      /* ignore */
    }
  }, [])

  const openAuth = useCallback((callback?: () => void) => {
    afterLoginRef.current = callback ?? null
    setIsAuthOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false)
    afterLoginRef.current = null
  }, [])

  async function login(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 1200))
    try {
      const users: (User & { password: string })[] = JSON.parse(
        localStorage.getItem('sg_users') || '[]'
      )
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      if (!found) return { ok: false, error: 'Invalid email or password.' }
      const userData: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        avatar: found.avatar,
      }
      setUser(userData)
      localStorage.setItem('sg_user', JSON.stringify(userData))
      setIsAuthOpen(false)
      if (afterLoginRef.current) {
        const cb = afterLoginRef.current
        afterLoginRef.current = null
        setTimeout(cb, 250)
      }
      return { ok: true }
    } catch {
      return { ok: false, error: 'Something went wrong. Please try again.' }
    }
  }

  async function register(name: string, email: string, password: string) {
    await new Promise((r) => setTimeout(r, 1200))
    try {
      const users: (User & { password: string })[] = JSON.parse(
        localStorage.getItem('sg_users') || '[]'
      )
      if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { ok: false, error: 'An account with this email already exists.' }
      }
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e8501a&color=fff&bold=true&size=128&initials=${initials}`,
      }
      users.push(newUser)
      localStorage.setItem('sg_users', JSON.stringify(users))
      const userData: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      }
      setUser(userData)
      localStorage.setItem('sg_user', JSON.stringify(userData))
      setIsAuthOpen(false)
      if (afterLoginRef.current) {
        const cb = afterLoginRef.current
        afterLoginRef.current = null
        setTimeout(cb, 250)
      }
      return { ok: true }
    } catch {
      return { ok: false, error: 'Something went wrong. Please try again.' }
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('sg_user')
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthOpen, openAuth, closeAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
