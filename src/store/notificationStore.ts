import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  type: 'add' | 'update' | 'delete';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (type: 'add' | 'update' | 'delete', message: string) => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>()(persist(
  (set) => ({
    notifications: [],
    addNotification: (type, message) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type,
        message,
        timestamp: new Date(),
        read: false,
      };
      
      set((state) => ({
        notifications: [notification, ...state.notifications],
      }));
      
      if (type === 'add') toast.success(message);
      else if (type === 'delete') toast.error(message);
      else toast(message);
    },
    markAsRead: (id) => set((state) => ({
      notifications: state.notifications.map((n) => 
        n.id === id ? { ...n, read: true } : n
      ),
    })),
    deleteNotification: (id) => set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
    markAllAsRead: () => set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
    clearAllNotifications: () => set({ notifications: [] }),
  }),
  { name: 'notifications' }
));