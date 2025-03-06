import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  chartData: {
    labels: string[];
    values: number[];
  };
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  name,
  symbol,
  price,
  change24h,
  chartData,
}) => {
  const isPositive = change24h >= 0;
  
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        borderColor: isPositive ? '#00CCFF' : '#FF4D4D',
        backgroundColor: isPositive ? 'rgba(0, 204, 255, 0.1)' : 'rgba(255, 77, 77, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="crypto-card">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-text-secondary text-sm">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">${price.toLocaleString()}</p>
          <p className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {Math.abs(change24h).toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="h-20">
        <Line data={data} options={options as any} />
      </div>
    </div>
  );
};

export default CryptoCard; 