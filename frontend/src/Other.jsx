import React from 'react';
import OtherChart from './OtherChart';

function Other({otherData}){
    return (
        <div className='flex flex-col gap-4'>
            <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
                <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">oven</span>Furnace 1</h3>
                {otherData && <OtherChart data={otherData.map(item => ({ time: item.time, value: item.furnace1 }))} label="Furnace 1" color="rgb(255, 99, 132)" />}
            </div>

            <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
                <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">oven</span>Furnace 2</h3>
                {otherData && <OtherChart data={otherData.map(item => ({ time: item.time, value: item.furnace2 }))} label="Furnace 2" color="rgb(54, 162, 235)" />}
            </div>

            <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
                <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">local_bar</span>Wine Cellar</h3>
                {otherData && <OtherChart data={otherData.map(item => ({ time: item.time, value: item.wineCellar }))} label="Wine Cellar" color="rgb(255, 206, 86)" />}
            </div>

            <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
                <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">delete</span>Garage Door</h3>
                {otherData && <OtherChart data={otherData.map(item => ({ time: item.time, value: item.garageDoor }))} label="Garage Door" color="rgb(75, 192, 192)" />}
            </div>

            <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
                <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">cottage</span>Barn</h3>
                {otherData && <OtherChart data={otherData.map(item => ({ time: item.time, value: item.barn }))} label="Barn" color="rgb(153, 102, 255)" />}
            </div>

            <div className='m-3 bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
                <h3 className='text-xl flex items-center text-emerald-400 m-2'><span class="material-symbols-outlined mx-3">water</span>Well</h3>
                {otherData && <OtherChart data={otherData.map(item => ({ time: item.time, value: item.well }))} label="Well" color="rgb(255, 159, 64)" />}
            </div>
        </div>
    );
}

export default Other;