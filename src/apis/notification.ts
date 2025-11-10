import axios from 'axios';
import { handleBackendToast, handleApiError } from '../utils/helpers';

const API_BASE = 'http://localhost:5000/api';

export interface Notification {
  _id?: string;
  type: 'add' | 'update' | 'delete';
  message: string;
  timestamp: Date;
  read: boolean;
}

export async function fetchNotifications(): Promise<Notification[]> {
  try {
    const response = await axios.get(`${API_BASE}/notifications`);
    handleBackendToast(response.data.toast);
    return response.data.notifications;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function addNotification(notification: Omit<Notification, '_id'>): Promise<Notification> {
  try {
    const response = await axios.post(`${API_BASE}/notifications`, notification);
    handleBackendToast(response.data.toast);
    return response.data.notification || response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function updateNotification(id: string, notification: Partial<Notification>): Promise<Notification> {
  try {
    const response = await axios.put(`${API_BASE}/notifications/${id}`, notification);
    handleBackendToast(response.data.toast);
    return response.data.notification || response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function deleteNotification(id: string): Promise<void> {
  try {
    const response = await axios.delete(`${API_BASE}/notifications/${id}`);
    handleBackendToast(response.data.toast);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function clearAllNotifications(): Promise<void> {
  try {
    const response = await axios.delete(`${API_BASE}/notifications`);
    handleBackendToast(response.data.toast);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}