
import { fetcher } from "./requests"

export const organizationsApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    // TODO: Add pagination and search params to the request
    return fetcher("/api/organizations")
  },

  create: async (data: any) => {
    return fetcher("/api/organizations", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: any) => {
    return fetcher(`/api/organizations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetcher(`/api/organizations/${id}`, {
      method: "DELETE",
    })
  },
}
