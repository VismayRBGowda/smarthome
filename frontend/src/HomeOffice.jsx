import React from 'react';
import HomeOfficeChart from './HomeOfficeChart';

function HomeOffice({ homeOfficeData }) {
  return (
    <div className='graph bg-zinc-700/35 rounded-xl cursor-pointer hover:bg-zinc-700/45 p-2'>
      {homeOfficeData && <HomeOfficeChart data={homeOfficeData} />}
    </div>
  );
}

export default HomeOffice;