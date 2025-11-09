import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/apis/notification';
import { formatDistanceToNow } from 'date-fns';

export const RealTimeNotifications = () => {
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 3000,
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'add': return <CheckCircle className="h-4 w-4" />;
      case 'delete': return <Trash2 className="h-4 w-4" />;
      case 'update': return <AlertCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'add': return 'bg-green-100 text-green-600';
      case 'delete': return 'bg-red-100 text-red-600';
      case 'update': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Live Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50 animate-pulse" />
            <p className="text-sm">Loading...</p>
          </div>
        ) : notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification: any) => (
            <div key={notification._id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{notification.message}</p>
                <p className="text-xs text-gray-500 capitalize">{notification.type} operation</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
