import React from 'react';
import KitchenChart from './KitchenChart';

function Kitchen({ kitchenData }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
        <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">dishwasher</span>Dishwasher</h3>
        {kitchenData && <KitchenChart data={kitchenData.map(item => ({ time: item.time, value: item.dishwasher }))} label="Dishwasher" color="rgb(255, 99, 132)" />}
      </div>

      <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
        <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">kitchen</span>Fridge</h3>
        {kitchenData && <KitchenChart data={kitchenData.map(item => ({ time: item.time, value: item.fridge }))} label="Fridge" color="rgb(54, 162, 235)" />}
      </div>

      <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
        <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">microwave</span>Microwave</h3>
        {kitchenData && <KitchenChart data={kitchenData.map(item => ({ time: item.time, value: item.microwave }))} label="Microwave" color="rgb(255, 206, 86)" />}
      </div>

      <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
        <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">kitchen</span>Kitchen 12</h3>
        {kitchenData && <KitchenChart data={kitchenData.map(item => ({ time: item.time, value: item.kitchen12 }))} label="Kitchen 12" color="rgb(75, 192, 192)" />}
      </div>

      <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
        <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">kitchen</span>Kitchen 14</h3>
        {kitchenData && <KitchenChart data={kitchenData.map(item => ({ time: item.time, value: item.kitchen14 }))} label="Kitchen 14" color="rgb(153, 102, 255)" />}
      </div>

      <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
        <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">kitchen</span>Kitchen 38</h3>
        {kitchenData && <KitchenChart data={kitchenData.map(item => ({ time: item.time, value: item.kitchen38 }))} label="Kitchen 38" color="rgb(255, 159, 64)" />}
      </div>
    </div>
  );
}

export default Kitchen;