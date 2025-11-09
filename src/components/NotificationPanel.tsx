import { Bell, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useNotificationStore } from '../store/notificationStore';
import { useState, useEffect } from 'react';

export default function NotificationPanel() {
  const { notifications, markAsRead, deleteNotification, markAllAsRead, clearAllNotifications, fetchNotifications } = useNotificationStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchNotifications().catch(err => console.error('Fetch notifications error:', err));
  }, [fetchNotifications]);

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="relative gap-2" 
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          )}
        </div>
        <span className="text-sm">Notifications ({unreadCount})</span>
      </Button>
      
      {showDropdown && (
        <>
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Notifications ({notifications.length})</h3>
              {notifications.length > 0 && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={markAllAsRead} title="Mark all as read">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={clearAllNotifications} title="Clear all">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification._id} 
                    className={`p-3 border-b hover:bg-gray-50 group relative ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => markAsRead(notification._id!)}
                      >
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                          <p className={`text-sm ${
                            !notification.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-4">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification._id!);
                        }}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-red-500 transition-all p-1"
                        title="Delete notification"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowDropdown(false)}
          />
        </>
      )}
    </div>
  );
}