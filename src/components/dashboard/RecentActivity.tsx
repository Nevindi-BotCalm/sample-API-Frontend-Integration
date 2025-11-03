import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface RecentActivityProps {
  activities: any[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-semibold">System Activity</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {activities.length > 0 ? activities.map((activity, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
            <Activity className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
            <p className="text-xs text-gray-500">{activity.action}</p>
          </div>
          <span className="text-xs text-gray-400">{activity.time}</span>
        </div>
      )) : (
        <div className="text-center py-8 text-gray-500">
          <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </CardContent>
  </Card>
);