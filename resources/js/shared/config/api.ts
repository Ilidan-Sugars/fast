/**
 * shared/config/api.ts
 * API endpoints
 */

export const API = {
  // Auth
  LOGIN: '/api/admin/login',
  LOGOUT: '/api/admin/logout',

  // Services
  SERVICES: '/api/services',
  SERVICE: (id: number) => `/api/services/${id}`,

  // Vacancies
  VACANCIES: '/api/vacancies',
  VACANCY: (id: number) => `/api/vacancies/${id}`,
}
