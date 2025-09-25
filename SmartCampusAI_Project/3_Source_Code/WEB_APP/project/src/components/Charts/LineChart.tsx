import React from 'react';

interface LineChartProps {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, color = '#10B981' }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const points = data.map((item, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - ((item.value - minValue) / range) * 100
  }));

  const pathData = points.reduce((path, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`;
  }, '');

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="relative">
        <svg viewBox="0 0 100 60" className="w-full h-32">
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="2"
            className="transition-all duration-500"
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill={color}
              className="transition-all duration-500"
            />
          ))}
        </svg>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          {data.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;