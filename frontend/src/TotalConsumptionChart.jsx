import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TotalConsumptionChart({ data }) {
  const chartData = {
    labels: data.map((item) => new Date(item.time * 1000).toLocaleTimeString()), // Convert timestamps to time labels
    datasets: [
      {
        label: 'Total Energy Consumption (kW)',
        data: data.map((item) => item.value),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} height={400} width={800} />;
}

export default TotalConsumptionChart;