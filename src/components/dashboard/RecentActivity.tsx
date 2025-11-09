import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, UserPlus, FileEdit, Trash2, Settings } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'create' | 'edit' | 'delete' | 'settings' | 'default';
  color: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  const icons = {
    create: UserPlus,
    edit: FileEdit,
    delete: Trash2,
    settings: Settings,
    default: Activity,
  };
  const Icon = icons[type] || icons.default;
  return <Icon className="h-4 w-4" />;
};

export const RecentActivity = ({ activities, isLoading, onViewAll }: RecentActivityProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-semibold">System Activity</CardTitle>
      {onViewAll && activities.length > 0 && (
        <button 
          onClick={onViewAll}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </button>
      )}
    </CardHeader>
    <CardContent className="space-y-4">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))
      ) : activities.length > 0 ? (
        activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{activity.user}</p>
              <p className="text-xs text-gray-500 truncate">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </CardContent>
  </Card>
);