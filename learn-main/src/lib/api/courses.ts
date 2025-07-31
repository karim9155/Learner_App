import { fetcher } from "./requests"

export const coursesApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    // TODO: Add pagination and search params to the request
    return fetcher("/api/courses")
  },

  create: async (data: any) => {
    return fetcher("/api/courses", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return fetcher(`/api/courses/${id}`, {
      method: "DELETE",
    })
  },
}