import React from 'react';
import LivingRoomChart from './LivingRoomChart';

function LivingRoom({ livingRoomData }) {
  return (
    <div>
      {livingRoomData && <LivingRoomChart data={livingRoomData} />}
    </div>
  );
}

export default LivingRoom;