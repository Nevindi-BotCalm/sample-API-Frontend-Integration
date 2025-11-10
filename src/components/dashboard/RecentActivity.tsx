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

export const RecentActivity = ({
  activities,
  isLoading,
  onViewAll,
}: RecentActivityProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-semibold">System Activity</CardTitle>
      {onViewAll && activities.length > 0 && (
        <button
          onClick={onViewAll}
          className="text-xs font-medium text-blue-600 hover:text-blue-800"
        >
          View All
        </button>
      )}
    </CardHeader>
    <CardContent className="space-y-4">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex animate-pulse items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        ))
      ) : activities.length > 0 ? (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="-mx-2 flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.color}`}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {activity.user}
              </p>
              <p className="truncate text-xs text-gray-500">
                {activity.action}
              </p>
            </div>
            <span className="text-xs whitespace-nowrap text-gray-400">
              {activity.time}
            </span>
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-gray-500">
          <Activity className="mx-auto mb-2 h-8 w-8 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </CardContent>
  </Card>
);
