import { delay } from './constants'

export const progressApi = {
  getByEnrollment: async (enrollmentId: string) => {
    await delay(400)
    // Mock progress data for the enrollment
    const mockProgress = [
      {
        id: "1",
        watchedPercent: 100,
        lastWatchedAt: "2024-01-14T10:30:00Z",
        video: { id: "1", title: "Introduction to Components", duration: 1200, order: 1 },
      },
      {
        id: "2",
        watchedPercent: 75,
        lastWatchedAt: "2024-01-14T11:15:00Z",
        video: { id: "2", title: "Props and State", duration: 1800, order: 2 },
      },
      {
        id: "3",
        watchedPercent: 30,
        lastWatchedAt: "2024-01-14T12:00:00Z",
        video: { id: "3", title: "Event Handling", duration: 1500, order: 3 },
      },
    ]
    return { data: { success: true, data: mockProgress } }
  },
}