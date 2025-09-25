import React from 'react';

interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, color = '#3B82F6' }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-sm text-gray-600 dark:text-gray-400 text-right mr-4">
              {item.name}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color
                }}
              />
            </div>
            <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right ml-4">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;