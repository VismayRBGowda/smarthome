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

function OtherChart({ data, label, color }) {
  // if (!data || data.length === 0) {
  //     return <div>No data available for Other Chart</div>;
  // }

  const chartData = {
      labels: data.map((item) => new Date(item.time * 1000).toLocaleTimeString()),
      datasets: [
          {
            label: label, // Use the label prop
            data: data.map((item) => item.value), // Assuming your data now has a 'value' field
            fill: false,
            borderColor: color, // Use the color prop
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

  return <Line data={chartData} options={options} height={400} width={800}/>;
}

export default OtherChart;