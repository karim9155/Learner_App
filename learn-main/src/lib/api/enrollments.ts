import { delay } from './constants'
import { mockEnrollments } from './mock/data'

export const enrollmentsApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    await delay(400)
    let filteredEnrollments = [...mockEnrollments]

    if (params?.search) {
      const search = params.search.toLowerCase()
      filteredEnrollments = filteredEnrollments.filter(
          (enrollment) =>
              enrollment.user.firstName.toLowerCase().includes(search) ||
              enrollment.user.lastName.toLowerCase().includes(search) ||
              enrollment.course.title.toLowerCase().includes(search),
      )
    }

    if (params?.status) {
      filteredEnrollments = filteredEnrollments.filter((enrollment) => enrollment.status === params.status)
    }

    return {
      data: {
        data: filteredEnrollments,
        total: filteredEnrollments.length,
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: Math.ceil(filteredEnrollments.length / (params?.limit || 10)),
      },
    }
  },

  getById: async (id: string) => {
    await delay(300)
    const enrollment = mockEnrollments.find((e) => e.id === id)
    return { data: { success: true, data: enrollment } }
  },
}