import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';

interface ActivityChartProps {
  cartData: any[];
  users: any[];
}

export const ActivityChart = ({ cartData, users }: ActivityChartProps) => {
  const chartData = useMemo(() => {
    if (cartData.length === 0) {
      return [{ range: 'No Data', count: 0, height: 20 }];
    }
    
    const priceRanges = [0, 50, 100, 200, 500];
    const maxCount = Math.max(1, cartData.length);
    
    const data = priceRanges.map((range, i) => {
      const nextRange = priceRanges[i + 1] || Infinity;
      const count = cartData.filter(item => item.price >= range && item.price < nextRange).length;
      const height = count > 0 ? Math.max(20, (count / maxCount) * 80) : 10;
      return { 
        range: i === priceRanges.length - 1 ? `$${range}+` : `$${range}-${priceRanges[i + 1] - 1}`, 
        count, 
        height 
      };
    });
    return data;
  }, [cartData]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Price Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between space-x-2">
          {chartData.map((item, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 flex-1">
              <div className="text-xs text-gray-600 mb-1">{item.count}</div>
              <div 
                className={`w-full rounded-t transition-all duration-300 ${
                  i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ height: `${item.height}px`, minHeight: '10px' }}
                title={`${item.count} items in ${item.range} range`}
              />
              <span className="text-xs text-gray-500 text-center">{item.range}</span>
            </div>
          ))}
        </div>
        {cartData.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Total Items: {cartData.length} | Price Range: ${Math.min(...cartData.map(item => item.price)).toFixed(2)} - ${Math.max(...cartData.map(item => item.price)).toFixed(2)}
          </div>
        )}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Low Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Mid Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">High Price</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};