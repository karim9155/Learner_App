import { delay } from './constants'
import { mockUsers } from './mock/data'

export const usersApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; role?: string }) => {
    await delay(400)
    let filteredUsers = [...mockUsers]

    if (params?.search) {
      const search = params.search.toLowerCase()
      filteredUsers = filteredUsers.filter(
          (user) =>
              user.firstName.toLowerCase().includes(search) ||
              user.lastName.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search),
      )
    }

    if (params?.role) {
      filteredUsers = filteredUsers.filter((user) =>
          user.memberships.some((membership) => membership.role === params.role),
      )
    }

    return {
      data: {
        data: filteredUsers,
        total: filteredUsers.length,
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: Math.ceil(filteredUsers.length / (params?.limit || 10)),
      },
    }
  },

  create: async (data: any) => {
    await delay(600)
    const newUser = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      memberships: [],
    }
    mockUsers.push(newUser)
    return { data: { success: true, data: newUser } }
  },

  delete: async (id: string) => {
    await delay(400)
    const index = mockUsers.findIndex((user) => user.id === id)
    if (index !== -1) {
      mockUsers.splice(index, 1)
    }
    return { data: { success: true } }
  },
}