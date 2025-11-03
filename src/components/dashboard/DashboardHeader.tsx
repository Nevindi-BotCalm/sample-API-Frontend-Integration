import { Button } from '@/components/ui/button';
import { Search, Calendar } from 'lucide-react';
import NotificationPanel from '@/components/NotificationPanel';

interface DashboardHeaderProps {
  onTodayClick: () => void;
}

export const DashboardHeader = ({ onTodayClick }: DashboardHeaderProps) => (
  <div className="mb-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <NotificationPanel />
        <Button variant="outline" size="sm" onClick={onTodayClick}>
          <Calendar className="h-4 w-4 mr-2" />
          Today
        </Button>
      </div>
    </div>
  </div>
);