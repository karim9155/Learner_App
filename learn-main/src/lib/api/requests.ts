
import { API_URL } from "./constants"

const getAuthToken = () => {
  // Ensure this code runs only in the browser
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token")
  }
  return null
}

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `API error at ${endpoint}`)
  }

  // Handle responses that don't have a JSON body
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return { success: true }
  }

  return response.json()
}
