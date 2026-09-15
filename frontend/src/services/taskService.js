import { API } from './api';

export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

export const taskService = {
  getTasks: (params) => API.get('/tasks', { params }),
  getTaskById: (id) => API.get(`/tasks/${id}`),
  createTask: (data) => API.post('/tasks', data),
  updateTask: (id, data) => API.put(`/tasks/${id}`, data),
  updateTaskStatus: (id, data) => API.patch(`/tasks/${id}/status`, data),
  deleteTask: (id) => API.delete(`/tasks/${id}`),
  getTaskStats: () => API.get('/tasks/stats'),
};
