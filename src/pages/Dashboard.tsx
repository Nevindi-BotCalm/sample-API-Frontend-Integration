import { ShoppingCart, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchCarts } from '@/apis/cart';
import { useUserStore } from '@/store/userStore';
import { useMemo, useState } from 'react';

import NotificationDemo from '@/components/NotificationDemo';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { RealTimeNotifications } from '@/components/dashboard/RealTimeNotifications';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DateNotification } from '@/components/dashboard/DateNotification';
import { LoadingSpinner } from '@/components/dashboard/LoadingSpinner';

export default function Dashboard() {
  const { data: cartData = [], isLoading: cartsLoading } = useQuery({
    queryKey: ['carts'],
    queryFn: fetchCarts,
  });
  const { users } = useUserStore();
  const [showDateNotification, setShowDateNotification] = useState(false);

  const handleTodayClick = () => {
    setShowDateNotification(true);
    setTimeout(() => setShowDateNotification(false), 3000);
  };

  const stats = useMemo(() => {
    const totalItems = cartData.length;
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.isActive).length;
    const totalRevenue = cartData.reduce(
      (sum: number, item: any) => sum + item.total,
      0
    );
    const avgOrderValue = totalItems > 0 ? totalRevenue / totalItems : 0;

    return {
      totalItems,
      totalUsers,
      activeUsers,
      totalRevenue,
      avgOrderValue,
    };
  }, [cartData, users]);



  if (cartsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DashboardHeader onTodayClick={handleTodayClick} />

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Cart Items"
          value={stats.totalItems.toString()}
          icon={ShoppingCart}
          trend={`${stats.totalItems} items in system`}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          icon={Users}
          trend={`${stats.activeUsers} active users`}
          color="bg-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          trend={`Avg: $${stats.avgOrderValue.toFixed(2)} per item`}
          color="bg-orange-500"
        />
        <StatCard
          title="Active Rate"
          value={`${stats.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1) : 0}%`}
          icon={TrendingUp}
          trend={`${stats.activeUsers}/${stats.totalUsers} users active`}
          color="bg-purple-500"
        />
      </div>

      {/* Demo Section */}
      <div className="mb-6">
        <NotificationDemo />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ActivityChart cartData={cartData} />
        <RealTimeNotifications />
      </div>


      <DateNotification show={showDateNotification} />
    </div>
  );
}
