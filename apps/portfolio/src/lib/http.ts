const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

interface Item {
  id: string
  project: string
  title: string
  note: string
  createdAt: string
  updatedAt: string
}

interface CreateItemRequest {
  project: string
  title: string
  note: string
}

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'HttpError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new HttpError(response.status, errorData.message || `HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  return handleResponse<T>(response)
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  return handleResponse<T>(response)
}

// API-specific functions
export async function getItems(): Promise<Item[]> {
  return get<Item[]>('/items')
}

export async function createItem(item: CreateItemRequest): Promise<Item> {
  return post<Item>('/items', item)
}

export { HttpError }
export type { Item, CreateItemRequest, ApiResponse }


