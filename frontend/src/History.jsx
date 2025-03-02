import React, { useEffect, useState } from 'react';
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

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [selectedData, setSelectedData] = useState('House overall [kW]');

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/history'); // Replace with your actual API endpoint if different
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, []);

  const chartData = {
    labels: historyData.map((item) => new Date(item.time * 1000).toLocaleTimeString()), // Convert timestamps to time labels
    datasets: [
      {
        label: 'Historical Energy Consumption (kW)',
        data: historyData.map((item) => item[selectedData]),
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

  return (
    <div>
      <div className='flex items-center gap-6 justify-between'>
        <h2 className='text-emerald-400 text-xl my-2'>Historical Energy Consumption</h2>
        <div className=' bg-red-400 rounded-full p-0.5 m-1'>
          <select value={selectedData} className='text-white m-2 focus:outline-none bg-red-400' onChange={(e) => setSelectedData(e.target.value)}>
            <option value="House overall [kW]">House overall</option>

            {/* Kitchen */}
            <option value="Dishwasher [kW]">Dishwasher</option>
            <option value="Fridge [kW]">Fridge</option>
            <option value="Microwave [kW]">Microwave</option>
            <option value="Kitchen 12 [kW]">Kitchen 12</option>
            <option value="Kitchen 14 [kW]">Kitchen 14</option>
            <option value="Kitchen 38 [kW]">Kitchen 38</option>

            {/* Living Room */}
            <option value="Living room [kW]">Living Room</option>

            {/* Home Office */}
            <option value="Home office [kW]">Home Office</option>

            {/* Other */}
            <option value="Furnace 1 [kW]">Furnace 1</option>
            <option value="Furnace 2 [kW]">Furnace 2</option>
            <option value="Wine cellar [kW]">Wine Cellar</option>
            <option value="Garage door [kW]">Garage Door</option>
            <option value="Barn [kW]">Barn</option>
            <option value="Well [kW]">Well</option>
          </select>
        </div>
      </div>

      <div className="graph bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2">
        {historyData.length > 0 ? (
          <Line data={chartData} options={options} height={400} width={800} />
        ) : (
          <p className='text-gray-300'>Loading historical data...</p>
        )}
      </div>
    </div>
  );
}

export default History;