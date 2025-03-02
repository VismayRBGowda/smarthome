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

function HomeOfficeChart({ data }) {
  const chartData = {
    labels: data.map((item) => new Date(item.time * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Home Office',
        data: data.map((item) => item.homeOffice),
        fill: false,
        borderColor: 'rgb(54, 162, 235)', // Example color
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

  return <Line data={chartData} options={options}  height={400} width={800} />;
}

export default HomeOfficeChart;