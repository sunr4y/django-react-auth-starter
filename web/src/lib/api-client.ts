import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { API_URL } from "./config"

const TOKEN_KEY = "auth_tokens"
const STORAGE_TYPE_KEY = "auth_storage_type"

export interface StoredTokens {
  access: string
  refresh: string
}

export function getStoredTokens(): StoredTokens | null {
  // Check both storages (localStorage first, then sessionStorage)
  let tokens = localStorage.getItem(TOKEN_KEY)
  if (!tokens) {
    tokens = sessionStorage.getItem(TOKEN_KEY)
  }
  if (!tokens) return null
  try {
    return JSON.parse(tokens)
  } catch {
    return null
  }
}

export function setStoredTokens(
  tokens: StoredTokens,
  rememberMe: boolean = true
): void {
  // Clear from both storages first
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)

  // Store based on rememberMe preference
  if (rememberMe) {
    localStorage.setItem(STORAGE_TYPE_KEY, "local")
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
  } else {
    localStorage.setItem(STORAGE_TYPE_KEY, "session")
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
  }
}

export function clearStoredTokens(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(STORAGE_TYPE_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getStoredTokens()
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle token refresh
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else if (token) {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const tokens = getStoredTokens()
      if (!tokens?.refresh) {
        clearStoredTokens()
        isRefreshing = false
        return Promise.reject(error)
      }

      try {
        const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
          refresh: tokens.refresh,
        })

        const newTokens = {
          access: response.data.access,
          refresh: response.data.refresh || tokens.refresh,
        }
        setStoredTokens(newTokens)

        processQueue(null, newTokens.access)
        originalRequest.headers.Authorization = `Bearer ${newTokens.access}`

        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        clearStoredTokens()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
