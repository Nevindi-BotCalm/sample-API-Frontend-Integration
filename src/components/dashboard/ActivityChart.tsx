// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useMemo } from 'react';

// interface ActivityChartProps {
//   cartData: any[];
// }

// export const ActivityChart = ({ cartData }: ActivityChartProps) => {
//   const chartData = useMemo(() => {
//     if (cartData.length === 0) {
//       return [{ range: 'No Data', count: 0, height: 20 }];
//     }
    
//     const priceRanges = [0, 50, 100, 200, 500];
//     const maxCount = Math.max(1, cartData.length);
    
//     const data = priceRanges.map((range, i) => {
//       const nextRange = priceRanges[i + 1] || Infinity;
//       const count = cartData.filter(item => item.price >= range && item.price < nextRange).length;
//       const height = count > 0 ? Math.max(20, (count / maxCount) * 80) : 10;
//       return { 
//         range: i === priceRanges.length - 1 ? `$${range}+` : `$${range}-${priceRanges[i + 1] - 1}`, 
//         count, 
//         height 
//       };
//     });
//     return data;
//   }, [cartData]);

//   {/* Render the chart */}
//   return (
//     <Card className="col-span-2">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold">Price Distribution</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-64 flex items-end justify-between space-x-2">
//           {chartData.map((item, i) => (
//             <div key={i} className="flex flex-col items-center space-y-2 flex-1">
//               <div className="text-xs text-gray-600 mb-1">{item.count}</div>
//               <div 
//                 className={`w-full rounded-t transition-all duration-300 min-h-[10px] ${
//                   i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-orange-500' : 'bg-green-500'
//                 } ${
//                   item.height > 60 ? 'h-20' : item.height > 40 ? 'h-16' : item.height > 20 ? 'h-12' : 'h-8'
//                 }`}
//                 title={`${item.count} items in ${item.range} range`}
//               />
//               <span className="text-xs text-gray-500 text-center">{item.range}</span>
//             </div>
//           ))}
//         </div>
//         {cartData.length > 0 && (
//           <div className="mt-4 text-sm text-gray-600 text-center">
//             Total Items: {cartData.length} | Price Range: ${Math.min(...cartData.map(item => item.price)).toFixed(2)} - ${Math.max(...cartData.map(item => item.price)).toFixed(2)}
//           </div>
//         )}
//         <div className="flex justify-center space-x-6 mt-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//             <span className="text-sm text-gray-600">Low Price</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//             <span className="text-sm text-gray-600">High Price</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <span className="text-sm text-gray-600"> Mid Price</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo, useState } from 'react';

interface ActivityChartProps {
  cartData: any[];
}

export const ActivityChart = ({ cartData }: ActivityChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedRange, setSelectedRange] = useState<number | null>(null);

  const chartData = useMemo(() => {
    if (cartData.length === 0) {
      return [];
    }
    
    const priceRanges = [
      { min: 0, max: 50, label: '$0-49', color: 'rgb(16, 185, 129)', bgColor: 'bg-emerald-500' },
      { min: 50, max: 100, label: '$50-99', color: 'rgb(59, 130, 246)', bgColor: 'bg-blue-500' },
      { min: 100, max: 200, label: '$100-199', color: 'rgb(168, 85, 247)', bgColor: 'bg-purple-500' },
      { min: 200, max: 500, label: '$200-499', color: 'rgb(245, 158, 11)', bgColor: 'bg-amber-500' },
      { min: 500, max: Infinity, label: '$500+', color: 'rgb(244, 63, 94)', bgColor: 'bg-rose-500' }
    ];
    
    const total = cartData.length;
    
    return priceRanges.map(({ min, max, label, color, bgColor }) => {
      const items = cartData.filter(item => item.price >= min && item.price < max);
      const count = items.length;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      return { range: label, count, percentage, color, bgColor, items };
    }).filter(item => item.count > 0);
  }, [cartData]);

  const filteredItems = selectedRange !== null ? chartData[selectedRange]?.items || [] : cartData;

  const stats = useMemo(() => {
    if (filteredItems.length === 0) return { min: 0, max: 0, avg: 0, total: 0 };
    const prices = filteredItems.map(item => item.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((a, b) => a + b, 0) / prices.length,
      total: filteredItems.length
    };
  }, [filteredItems]);

  if (cartData.length === 0) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Price Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-400">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const radius = 80;
  const centerX = 120;
  const centerY = 120;
  const maxRadius = radius;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Price Distribution
          {selectedRange !== null && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              - Filtered by {chartData[selectedRange]?.range}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Interactive Radial Chart */}
          <div className="flex-1 flex justify-center">
            <svg width="240" height="240" className="overflow-visible">
              {/* Background circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="40"
              />
              
              {/* Data segments */}
              {chartData.map((item, i) => {
                const startAngle = chartData
                  .slice(0, i)
                  .reduce((sum, d) => sum + (d.percentage / 100) * 360, 0);
                const endAngle = startAngle + (item.percentage / 100) * 360;
                
                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);
                
                const isHovered = hoveredIndex === i;
                const isSelected = selectedRange === i;
                const currentRadius = isHovered || isSelected ? maxRadius + 10 : maxRadius;
                
                const x1 = centerX + currentRadius * Math.cos(startRad);
                const y1 = centerY + currentRadius * Math.sin(startRad);
                const x2 = centerX + currentRadius * Math.cos(endRad);
                const y2 = centerY + currentRadius * Math.sin(endRad);
                
                const largeArc = item.percentage > 50 ? 1 : 0;
                
                const path = `
                  M ${centerX} ${centerY}
                  L ${x1} ${y1}
                  A ${currentRadius} ${currentRadius} 0 ${largeArc} 1 ${x2} ${y2}
                  Z
                `;
                
                return (
                  <g key={i}>
                    <path
                      d={path}
                      fill={item.color}
                      opacity={isSelected ? 1 : isHovered ? 0.9 : 0.8}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setSelectedRange(selectedRange === i ? null : i)}
                    />
                    
                    {/* Label */}
                    {item.percentage > 5 && (
                      <text
                        x={centerX + (currentRadius * 0.7) * Math.cos((startRad + endRad) / 2)}
                        y={centerY + (currentRadius * 0.7) * Math.sin((startRad + endRad) / 2)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold fill-white pointer-events-none"
                      >
                        {item.count}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Center text */}
              <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                className="text-2xl font-bold fill-gray-800"
              >
                {stats.total}
              </text>
              <text
                x={centerX}
                y={centerY + 10}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                Items
              </text>
            </svg>
          </div>

          {/* Legend and Stats */}
          <div className="flex-1 space-y-4">
            {/* Interactive Legend */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Ranges</h3>
              {chartData.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    selectedRange === i
                      ? 'bg-gray-100 shadow-sm scale-105'
                      : hoveredIndex === i
                      ? 'bg-gray-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedRange(selectedRange === i ? null : i)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${item.bgColor} rounded`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.range}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{item.count}</div>
                    <div className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <div className="p-3 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-lg">
                <div className="text-lg font-bold text-emerald-700">${stats.min.toFixed(2)}</div>
                <div className="text-xs text-emerald-600">Minimum</div>
              </div>
              <div className="p-3 bg-linear-to-br from-rose-50 to-rose-100 rounded-lg">
                <div className="text-lg font-bold text-rose-700">${stats.max.toFixed(2)}</div>
                <div className="text-xs text-rose-600">Maximum</div>
              </div>
              <div className="col-span-2 p-3 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-lg font-bold text-blue-700">${stats.avg.toFixed(2)}</div>
                <div className="text-xs text-blue-600">Average Price</div>
              </div>
            </div>

            {selectedRange !== null && (
              <button
                onClick={() => setSelectedRange(null)}
                className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};